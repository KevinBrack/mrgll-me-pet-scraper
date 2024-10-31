import express from 'express';
import openRouterService from '../services/openrouter';
import db from '../db/config';

const router = express.Router();

interface PetAbility {
    name: string;
    description: string;
}

interface Pet {
    name: string;
    description: string;
    abilities: PetAbility[];
}

interface GenerateNarrativeRequest {
    pet1: Pet;
    pet2: Pet;
}

interface GenerateImagePromptRequest {
    petId: number;
    imageSource?: string; // defaults to 'warcraftpets_images'
    artStyle?: string; // defaults to 'chibi'
}

interface BatchGenerateImagePromptsRequest {
    batchSize?: number; // defaults to 10
    imageSource?: string; // defaults to 'warcraftpets_images'
    artStyle?: string; // defaults to 'chibi'
}

// Generate a battle narrative
router.post('/narrative', async (req, res) => {
    try {
        const { pet1, pet2 } = req.body as GenerateNarrativeRequest;

        // Input validation
        if (
            !pet1?.name ||
            !pet1?.description ||
            !pet1?.abilities?.length ||
            !pet2?.name ||
            !pet2?.description ||
            !pet2?.abilities?.length
        ) {
            return res.status(400).json({
                error: 'Missing required fields: Both pets must include name, description, and abilities',
            });
        }

        const narrativeResponse = await openRouterService.generateBattleNarrative(pet1, pet2);

        res.json(narrativeResponse);
    } catch (error) {
        console.error('Error in narrative generation:', error);
        res.status(500).json({
            error: 'Failed to generate battle narrative',
        });
    }
});

// Generate an image prompt
router.post('/image', async (req, res) => {
    try {
        console.log('Received image prompt request:', req.body);
        const {
            petId,
            imageSource = 'warcraftpets_images',
            artStyle = 'chibi',
        } = req.body as GenerateImagePromptRequest;

        // Input validation
        if (!petId) {
            console.log('Missing petId in request');
            return res.status(400).json({
                error: 'Missing required field: petId is required',
            });
        }

        // Fetch pet data from blizzard_pets table
        console.log('Fetching pet data for id:', petId);
        const pet = await db('blizzard_pets').where({ id: petId }).first();

        if (!pet) {
            console.log('Pet not found:', petId);
            return res.status(404).json({
                error: 'Pet not found',
            });
        }
        console.log('Found pet:', pet);

        // Fetch image data from specified source (default: warcraftpets_images)
        console.log('Fetching image data from:', imageSource);
        const imageData = await db(imageSource).where({ pet_id: petId }).first();

        if (!imageData) {
            console.log('No image data found in', imageSource);
            return res.status(404).json({
                error: `No image data found for pet in ${imageSource}`,
            });
        }
        console.log('Found image data:', imageData);

        // Fetch art style from prompts_art_styles table
        console.log('Fetching art style:', artStyle);
        const artStyleData = await db('prompts_art_styles').where({ name: artStyle }).first();

        if (!artStyleData) {
            console.log('Art style not found:', artStyle);
            return res.status(404).json({
                error: `Art style '${artStyle}' not found`,
            });
        }
        console.log('Found art style:', artStyleData);

        // Generate the image prompt using the pet description and art style
        console.log('Generating image prompt with description:', pet.description);
        const imagePrompt = await openRouterService.generateImagePrompt(pet.description, artStyle);
        console.log('Generated image prompt:', imagePrompt);

        // Store the generated prompt and related data
        console.log('Storing prompt record...');
        const [promptRecord] = await db('app_prompts_pet_image')
            .insert({
                pet_id: petId,
                art_style_id: artStyleData.id,
                image_source_table: imageSource,
                image_source_url: imageData.pet_image_url,
                generated_prompt: imagePrompt,
                original_description: pet.description,
                metadata: JSON.stringify({
                    pet_name: pet.name,
                    art_style_name: artStyle,
                    source_pet_url: imageData.pet_url,
                }),
            })
            .returning('*');
        console.log('Stored prompt record:', promptRecord);

        res.json({
            imagePrompt,
            pet,
            imageData,
            artStyle: artStyleData,
            promptRecord,
        });
    } catch (error) {
        console.error('Error in image prompt generation:', error);
        if (error instanceof Error) {
            console.error('Error details:', error.message);
            console.error('Error stack:', error.stack);
        }
        res.status(500).json({
            error: 'Failed to generate image prompt',
        });
    }
});

// Batch generate image prompts
router.post('/image/batch', async (req, res) => {
    try {
        console.log('\n=== Starting Batch Processing ===');
        console.log('Received batch image prompt request:', req.body);
        const {
            batchSize = 10,
            imageSource = 'warcraftpets_images',
            artStyle = 'chibi',
        } = req.body as BatchGenerateImagePromptsRequest;

        console.log(`Configuration:
- Batch Size: ${batchSize}
- Image Source: ${imageSource}
- Art Style: ${artStyle}`);

        // Fetch art style data
        console.log('\nFetching art style data...');
        const artStyleData = await db('prompts_art_styles').where({ name: artStyle }).first();

        if (!artStyleData) {
            console.log(`Error: Art style '${artStyle}' not found`);
            return res.status(404).json({
                error: `Art style '${artStyle}' not found`,
            });
        }
        console.log('Art style found:', artStyleData.name);

        // Get pets that have images in the source table but no prompts yet
        console.log('\nQuerying for unprocessed pets...');
        const petsToProcess = await db(imageSource)
            .select(`${imageSource}.*`, 'blizzard_pets.description', 'blizzard_pets.name')
            .join('blizzard_pets', `${imageSource}.pet_id`, 'blizzard_pets.id')
            .leftJoin('app_prompts_pet_image', function () {
                this.on('app_prompts_pet_image.pet_id', '=', `${imageSource}.pet_id`)
                    .andOn(
                        'app_prompts_pet_image.art_style_id',
                        '=',
                        db.raw('?', [artStyleData.id])
                    )
                    .andOn(
                        'app_prompts_pet_image.image_source_table',
                        '=',
                        db.raw('?', [imageSource])
                    );
            })
            .whereNull('app_prompts_pet_image.id')
            .limit(batchSize);

        console.log(`Found ${petsToProcess.length} pets to process`);

        if (petsToProcess.length === 0) {
            console.log('No pets found needing processing');
            return res.json({
                processed: 0,
                successful: 0,
                failed: 0,
                results: [],
            });
        }

        console.log('\n=== Beginning Pet Processing ===');
        const results = [];
        let current = 1;
        for (const petData of petsToProcess) {
            console.log(`\nProcessing pet ${current}/${petsToProcess.length}:`);
            console.log(`- ID: ${petData.pet_id}`);
            console.log(`- Name: ${petData.name}`);

            try {
                console.log('Generating image prompt...');
                const imagePrompt = await openRouterService.generateImagePrompt(
                    petData.description,
                    artStyle
                );
                console.log('Prompt generated successfully');

                console.log('Storing prompt record...');
                const [promptRecord] = await db('app_prompts_pet_image')
                    .insert({
                        pet_id: petData.pet_id,
                        art_style_id: artStyleData.id,
                        image_source_table: imageSource,
                        image_source_url: petData.pet_image_url,
                        generated_prompt: imagePrompt,
                        original_description: petData.description,
                        metadata: JSON.stringify({
                            pet_name: petData.name,
                            art_style_name: artStyle,
                            source_pet_url: petData.pet_url,
                        }),
                    })
                    .returning('*');
                console.log('Record stored successfully');

                results.push({
                    success: true,
                    pet_id: petData.pet_id,
                    pet_name: petData.name,
                    promptRecord,
                });
                console.log('Pet processing completed successfully');
            } catch (error) {
                console.error(`Error processing pet ${petData.pet_id}:`, error);
                results.push({
                    success: false,
                    pet_id: petData.pet_id,
                    pet_name: petData.name,
                    error: 'Failed to generate or store prompt',
                });
                console.log('Pet processing failed');
            }
            current++;
        }

        console.log('\n=== Batch Processing Complete ===');
        console.log(`Processed: ${results.length}`);
        console.log(`Successful: ${results.filter((r) => r.success).length}`);
        console.log(`Failed: ${results.filter((r) => !r.success).length}`);

        res.json({
            processed: results.length,
            successful: results.filter((r) => r.success).length,
            failed: results.filter((r) => !r.success).length,
            results,
        });
    } catch (error) {
        console.error('Error in batch image prompt generation:', error);
        res.status(500).json({
            error: 'Failed to process batch',
        });
    }
});

export default router;
