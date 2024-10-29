import express from "express";
import openRouterService from "../services/openrouter";
import db from "../db/config";

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

// Generate a battle narrative
router.post("/narrative", async (req, res) => {
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
                error: "Missing required fields: Both pets must include name, description, and abilities",
            });
        }

        const narrativeResponse =
            await openRouterService.generateBattleNarrative(pet1, pet2);

        res.json(narrativeResponse);
    } catch (error) {
        console.error("Error in narrative generation:", error);
        res.status(500).json({
            error: "Failed to generate battle narrative",
        });
    }
});

// Generate an image prompt
router.post("/image", async (req, res) => {
    try {
        const {
            petId,
            imageSource = "warcraftpets_images",
            artStyle = "chibi",
        } = req.body as GenerateImagePromptRequest;

        // Input validation
        if (!petId) {
            return res.status(400).json({
                error: "Missing required field: petId is required",
            });
        }

        // Fetch pet data from blizzard_pets table
        const pet = await db("blizzard_pets").where({ id: petId }).first();

        if (!pet) {
            return res.status(404).json({
                error: "Pet not found",
            });
        }

        // Fetch image data from specified source (default: warcraftpets_images)
        const imageData = await db(imageSource)
            .where({ pet_id: petId })
            .first();

        if (!imageData) {
            return res.status(404).json({
                error: `No image data found for pet in ${imageSource}`,
            });
        }

        // Fetch art style from prompts_art_styles table
        const artStyleData = await db("prompts_art_styles")
            .where({ name: artStyle })
            .first();

        if (!artStyleData) {
            return res.status(404).json({
                error: `Art style '${artStyle}' not found`,
            });
        }

        // Generate the image prompt using the pet description and art style
        const imagePrompt = await openRouterService.generateImagePrompt(
            pet.description,
            artStyle
        );

        // Store the generated prompt and related data
        const [promptRecord] = await db("app_prompts_pet_image")
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
            .returning("*");

        res.json({
            imagePrompt,
            pet,
            imageData,
            artStyle: artStyleData,
            promptRecord,
        });
    } catch (error) {
        console.error("Error in image prompt generation:", error);
        res.status(500).json({
            error: "Failed to generate image prompt",
        });
    }
});

export default router;
