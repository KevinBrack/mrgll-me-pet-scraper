import express, { Request, Response } from "express";
import db from "../db/config";
import blizzardService from "../services/blizzard";

const router = express.Router();

router.get("/pets", async (req: Request, res: Response) => {
    try {
        // Get the list of pets
        const petsList = await blizzardService.getPetsList();

        // Process each pet
        for (const pet of petsList.pets) {
            // Get detailed information
            const details = await blizzardService.getPetDetails(pet.id);
            const media = await blizzardService.getPetMedia(pet.id);

            // Prepare the pet data
            const petData = {
                id: details.id,
                name: details.name,
                href: pet.key.href,
                battle_pet_type_id: details.battle_pet_type.id,
                battle_pet_type: details.battle_pet_type.type,
                battle_pet_type_name: details.battle_pet_type.name,
                description: details.description,
                is_capturable: details.is_capturable,
                is_tradable: details.is_tradable,
                is_battlepet: details.is_battlepet,
                is_alliance_only: details.is_alliance_only,
                is_horde_only: details.is_horde_only,
                source_type: details.source.type,
                source_name: details.source.name,
                icon: details.icon,
                creature_id: details.creature.id,
                creature_name: details.creature.name,
                creature_href: details.creature.key.href,
                is_random_creature_display: details.is_random_creature_display,
                media_id: details.media.id,
                media_href: details.media.key.href,
                should_exclude_if_uncollected:
                    details.should_exclude_if_uncollected,
                abilities: JSON.stringify(details.abilities),
                media_assets: JSON.stringify(media.assets),
            };

            // Insert or update the pet in the database
            await db("blizzard_pets").insert(petData).onConflict("id").merge();
        }

        // Return success response
        res.json({
            message: "Pet data successfully updated",
            count: petsList.pets.length,
        });
    } catch (error) {
        console.error("Error fetching pets:", error);
        res.status(500).json({ error: "Failed to fetch and store pets" });
    }
});

export default router;
