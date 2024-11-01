import express from 'express';
import openRouterService from '../services/openrouter';
import db from '../db/config';

const router = express.Router();

interface CreateBattleLocationRequest {
    name: string;
    description: string;
    image_url: string;
}

router.post('/', async (req, res) => {
    try {
        const { name, description, image_url } = req.body as CreateBattleLocationRequest;

        // Input validation
        if (!name || !description || !image_url) {
            return res.status(400).json({
                error: 'Missing required fields: name, description, and image_url are required',
            });
        }

        // Generate the prompts using OpenRouter
        const locationPrompts = await openRouterService.generateLocationPrompt(name, description);

        // Store in database
        const [location] = await db('app_battle_locations')
            .insert({
                name,
                lore: locationPrompts.loreDescription,
                image_prompt: locationPrompts.imagePrompt,
            })
            .returning('*');

        res.json(location);
    } catch (error) {
        console.error('Error creating battle location:', error);
        res.status(500).json({
            error: 'Failed to create battle location',
        });
    }
});

export default router;
