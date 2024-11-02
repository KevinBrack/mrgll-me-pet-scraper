import express, { Request, Response } from 'express';
import blizzardService from '../services/blizzard';
import db from '../db/config';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const startTime = Date.now();
    console.log('\n=== Starting Pet Abilities Update Process ===');
    console.log(`Time: ${new Date().toISOString()}`);

    try {
        // Set a longer timeout since we're processing a lot of data
        res.setTimeout(300000); // 5 minutes

        // Get the abilities index
        console.log('Fetching pet abilities index...');
        const abilitiesIndex = await blizzardService.getPetAbilitiesIndex();
        const totalAbilities = abilitiesIndex.abilities.length;
        console.log(`Found ${totalAbilities} abilities in Blizzard API`);

        // Check existing abilities count
        const existingCount = await db('blizzard_pet_abilities').count('* as count').first();
        console.log(`Current database has ${existingCount?.count || 0} abilities`);

        // Send initial response
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Transfer-Encoding': 'chunked',
        });

        // Process each ability
        let processedCount = 0;
        let newCount = 0;
        let lastLoggedPercentage = 0;

        console.log('\n--- Beginning Abilities Processing ---');

        for (const ability of abilitiesIndex.abilities) {
            try {
                // Check if ability already exists
                const existing = await db('blizzard_pet_abilities')
                    .where({ id: ability.id })
                    .first();

                if (existing) {
                    processedCount++;
                    // Send progress update for skipped abilities
                    res.write(
                        JSON.stringify({
                            status: 'processing',
                            processed: processedCount,
                            total: totalAbilities,
                            current: existing.name,
                            percentage: Math.round((processedCount / totalAbilities) * 100),
                            skipped: true,
                        }) + '\n'
                    );

                    // Log progress at every 25%
                    const currentPercentage = Math.floor((processedCount / totalAbilities) * 100);
                    if (currentPercentage >= lastLoggedPercentage + 25) {
                        lastLoggedPercentage = currentPercentage;
                        console.log(
                            `Progress: ${currentPercentage}% (${processedCount}/${totalAbilities} abilities processed)`
                        );
                        console.log(
                            `Time elapsed: ${((Date.now() - startTime) / 1000).toFixed(2)} seconds`
                        );
                    }

                    continue;
                }

                // Get detailed information for new abilities
                const details = await blizzardService.getPetAbilityDetails(ability.id);
                const media = await blizzardService.getPetAbilityMedia(ability.id);

                // Get the icon URL from media assets
                const iconAsset = media.assets.find((asset) => asset.key === 'icon');
                const iconUrl = iconAsset ? iconAsset.value : null;

                // Prepare the ability data
                const abilityData = {
                    id: details.id,
                    name: details.name,
                    icon: iconUrl,
                    details: JSON.stringify(details),
                };

                // Insert the new ability in the database
                await db('blizzard_pet_abilities').insert(abilityData);

                processedCount++;
                newCount++;
                console.log(`Added new ability: ${details.name} (ID: ${details.id})`);

                // Send progress update
                res.write(
                    JSON.stringify({
                        status: 'processing',
                        processed: processedCount,
                        total: totalAbilities,
                        current: details.name,
                        percentage: Math.round((processedCount / totalAbilities) * 100),
                        new: true,
                    }) + '\n'
                );
            } catch (error) {
                console.error(`Error processing ability ${ability.id}:`, error);
                // Continue with next ability if one fails
                continue;
            }
        }

        const endTime = Date.now();
        const totalTimeSeconds = ((endTime - startTime) / 1000).toFixed(2);

        console.log('\n=== Pet Abilities Update Process Complete ===');
        console.log(`Total time: ${totalTimeSeconds} seconds`);
        console.log(`Total abilities processed: ${processedCount}`);
        console.log(`New abilities added: ${newCount}`);
        console.log(`Skipped (already exists): ${processedCount - newCount}`);
        console.log('=====================================\n');

        // Send final success response
        res.end(
            JSON.stringify({
                status: 'complete',
                message: 'Pet abilities data successfully updated',
                processed: processedCount,
                newAbilitiesAdded: newCount,
                total: totalAbilities,
                timeElapsed: `${totalTimeSeconds} seconds`,
            })
        );
    } catch (error) {
        console.error('Error fetching abilities:', error);
        console.log('\n=== Pet Abilities Update Process Failed ===');
        console.log(`Time elapsed: ${((Date.now() - startTime) / 1000).toFixed(2)} seconds`);
        console.log('=====================================\n');

        if (!res.headersSent) {
            res.status(500).json({ error: 'Failed to fetch and store abilities' });
        } else {
            res.end(JSON.stringify({ error: 'Failed to fetch and store abilities' }));
        }
    }
});

export default router;
