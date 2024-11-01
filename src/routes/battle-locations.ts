import express from 'express';

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

        // Return not implemented for now
        res.status(501).json({
            error: 'Not implemented',
        });
    } catch (error) {
        console.error('Error creating battle location:', error);
        res.status(500).json({
            error: 'Failed to create battle location',
        });
    }
});

export default router;
