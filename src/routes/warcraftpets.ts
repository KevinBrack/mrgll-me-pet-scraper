import express, { Request, Response } from 'express';
import warcraftPetsService from '../services/warcraftpets';

const router = express.Router();

router.get('/pet/:petId', async (req: Request, res: Response) => {
    try {
        const petId = parseInt(req.params.petId);
        if (isNaN(petId)) {
            return res.status(400).json({ error: 'Invalid pet ID' });
        }

        const result = await warcraftPetsService.scrapePetById(petId);
        res.json(result);
    } catch (error) {
        console.error('Error in warcraftpets pet scrape:', error);
        res.status(500).json({ error: 'Failed to scrape warcraftpets data' });
    }
});

router.get('/pets', async (req: Request, res: Response) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
        if (isNaN(limit) || limit < 1) {
            return res.status(400).json({ error: 'Invalid limit value' });
        }

        const result = await warcraftPetsService.scrapePets(limit);
        res.json(result);
    } catch (error) {
        console.error('Error in warcraftpets batch scrape:', error);
        res.status(500).json({ error: 'Failed to scrape warcraftpets data' });
    }
});

export default router;
