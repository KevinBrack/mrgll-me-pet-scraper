import express, { Request, Response } from "express";
import db from "../db/config";
import blizzardService from "../services/blizzard";

const router = express.Router();

router.get("/pets", async (req: Request, res: Response) => {
    const startTime = Date.now();
    console.log("\n=== Starting Pet Data Update Process ===");
    console.log(`Time: ${new Date().toISOString()}`);

    try {
        // Set a longer timeout since we're processing a lot of data
        res.setTimeout(300000); // 5 minutes

        // Get the list of pets
        console.log("Fetching pet list from Blizzard API...");
        const petsList = await blizzardService.getPetsList();
        const totalPets = petsList.pets.length;
        console.log(`Found ${totalPets} pets in Blizzard API`);

        // Check existing pets count
        const existingPetsCount = await db("blizzard_pets")
            .count("* as count")
            .first();
        console.log(
            `Current database has ${existingPetsCount?.count || 0} pets`
        );

        // Send initial response
        res.writeHead(200, {
            "Content-Type": "application/json",
            "Transfer-Encoding": "chunked",
        });

        // Process each pet
        let processedCount = 0;
        let newPetsCount = 0;
        let lastLoggedPercentage = 0;

        console.log("\n--- Beginning Pet Processing ---");

        for (const pet of petsList.pets) {
            try {
                // Check if pet already exists in database
                const existingPet = await db("blizzard_pets")
                    .where({ id: pet.id })
                    .first();

                if (existingPet) {
                    processedCount++;
                    // Send progress update for skipped pets
                    res.write(
                        JSON.stringify({
                            status: "processing",
                            processed: processedCount,
                            total: totalPets,
                            current: existingPet.name,
                            percentage: Math.round(
                                (processedCount / totalPets) * 100
                            ),
                            skipped: true,
                        }) + "\n"
                    );

                    // Log progress at every 25%
                    const currentPercentage = Math.floor(
                        (processedCount / totalPets) * 100
                    );
                    if (currentPercentage >= lastLoggedPercentage + 25) {
                        lastLoggedPercentage = currentPercentage;
                        console.log(
                            `Progress: ${currentPercentage}% (${processedCount}/${totalPets} pets processed)`
                        );
                        console.log(
                            `Time elapsed: ${(
                                (Date.now() - startTime) /
                                1000
                            ).toFixed(2)} seconds`
                        );
                    }

                    continue;
                }

                // Get detailed information only for new pets
                const details = await blizzardService.getPetDetails(pet.id);
                const media = await blizzardService.getPetMedia(pet.id);

                // Prepare the pet data with null checks
                const petData = {
                    id: details.id,
                    name: details.name,
                    href: pet.key?.href || null,
                    battle_pet_type_id: details.battle_pet_type?.id || null,
                    battle_pet_type: details.battle_pet_type?.type || null,
                    battle_pet_type_name: details.battle_pet_type?.name || null,
                    description: details.description || null,
                    is_capturable: details.is_capturable || false,
                    is_tradable: details.is_tradable || false,
                    is_battlepet: details.is_battlepet || false,
                    is_alliance_only: details.is_alliance_only || false,
                    is_horde_only: details.is_horde_only || false,
                    source_type: details.source?.type || null,
                    source_name: details.source?.name || null,
                    icon: details.icon || null,
                    creature_id: details.creature?.id || null,
                    creature_name: details.creature?.name || null,
                    creature_href: details.creature?.key?.href || null,
                    is_random_creature_display:
                        details.is_random_creature_display || false,
                    media_id: details.media?.id || null,
                    media_href: details.media?.key?.href || null,
                    should_exclude_if_uncollected:
                        details.should_exclude_if_uncollected || false,
                    abilities: JSON.stringify(details.abilities || []),
                    media_assets: JSON.stringify(media.assets || []),
                };

                // Insert the new pet in the database
                await db("blizzard_pets").insert(petData);

                processedCount++;
                newPetsCount++;
                console.log(
                    `Added new pet: ${details.name} (ID: ${details.id})`
                );

                // Send progress update
                res.write(
                    JSON.stringify({
                        status: "processing",
                        processed: processedCount,
                        total: totalPets,
                        current: details.name,
                        percentage: Math.round(
                            (processedCount / totalPets) * 100
                        ),
                        new: true,
                    }) + "\n"
                );
            } catch (error) {
                console.error(`Error processing pet ${pet.id}:`, error);
                // Continue with next pet if one fails
                continue;
            }
        }

        const endTime = Date.now();
        const totalTimeSeconds = ((endTime - startTime) / 1000).toFixed(2);

        console.log("\n=== Pet Data Update Process Complete ===");
        console.log(`Total time: ${totalTimeSeconds} seconds`);
        console.log(`Total pets processed: ${processedCount}`);
        console.log(`New pets added: ${newPetsCount}`);
        console.log(
            `Skipped (already exists): ${processedCount - newPetsCount}`
        );
        console.log("=====================================\n");

        // Send final success response
        res.end(
            JSON.stringify({
                status: "complete",
                message: "Pet data successfully updated",
                processed: processedCount,
                newPetsAdded: newPetsCount,
                total: totalPets,
                timeElapsed: `${totalTimeSeconds} seconds`,
            })
        );
    } catch (error) {
        console.error("Error fetching pets:", error);
        console.log("\n=== Pet Data Update Process Failed ===");
        console.log(
            `Time elapsed: ${((Date.now() - startTime) / 1000).toFixed(
                2
            )} seconds`
        );
        console.log("=====================================\n");

        if (!res.headersSent) {
            res.status(500).json({ error: "Failed to fetch and store pets" });
        } else {
            res.end(
                JSON.stringify({ error: "Failed to fetch and store pets" })
            );
        }
    }
});

export default router;
