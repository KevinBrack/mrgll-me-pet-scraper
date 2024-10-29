import express, { Request, Response } from "express";
import db from "../db/config";
import blizzardService from "../services/blizzard";

const router = express.Router();

router.get("/pets", async (req: Request, res: Response) => {
    try {
        // Set a longer timeout since we're processing a lot of data
        res.setTimeout(300000); // 5 minutes

        // Get the list of pets
        const petsList = await blizzardService.getPetsList();

        // Send initial response
        res.writeHead(200, {
            "Content-Type": "application/json",
            "Transfer-Encoding": "chunked",
        });

        // Process each pet
        let processedCount = 0;
        const totalPets = petsList.pets.length;

        for (const pet of petsList.pets) {
            try {
                // Get detailed information
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

                // Insert or update the pet in the database
                await db("blizzard_pets")
                    .insert(petData)
                    .onConflict("id")
                    .merge();

                processedCount++;

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
                    }) + "\n"
                );
            } catch (error) {
                console.error(`Error processing pet ${pet.id}:`, error);
                // Continue with next pet if one fails
                continue;
            }
        }

        // Send final success response
        res.end(
            JSON.stringify({
                status: "complete",
                message: "Pet data successfully updated",
                count: processedCount,
                total: totalPets,
            })
        );
    } catch (error) {
        console.error("Error fetching pets:", error);
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
