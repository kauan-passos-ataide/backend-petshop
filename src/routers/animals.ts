import express from 'express';
import animalsData from '../data/animalsData'
import animalsSchema from '../schema/animalsSchema'
import { z } from 'zod';

const router = express.Router();


router.get('/especies', async (req, res) => {
    const especiesSchema = z.object({
        species: z.string().toLowerCase(),
    })
    
    const result = await especiesSchema.safeParse(req.query)
    
    if (!result.success) {
        res.status(404).json({ message: 'Invalid especie schema'})
    }

    const filteredAnimals = animalsData.filter(animal => animal.species.toLowerCase() === result.data?.species);

    const filteredResults = await animalsSchema.safeParse(filteredAnimals);

    if (filteredResults.success) {
        res.status(201).json(filteredAnimals);
    } else {
        res.status(501).json({ message: 'Internal error' });
    }
});
router.get('/breed', async (req, res) => {
    const breedSchema = z.object({
        breed: z.string().toLowerCase(),
    })

    const result = await breedSchema.safeParse(req.query)

    if (!result.success) {
        res.status(404).json({ message: 'Invalid breed schema'})
    }

    const filteredAnimals = await animalsData.filter(animal => animal.breed.toLowerCase() === result.data?.breed);

    const filteredResults = await animalsSchema.safeParse(filteredAnimals);

    if (filteredResults.success) {
        res.status(201).json(filteredAnimals);
    } else {
        res.status(501).json({ message: 'Internal error' });
    }
});

router.get('/', async (req, res) => {
    const result = await animalsSchema.safeParse(animalsData);
    if (result.success) {
        res.status(201).json(animalsData);
    } else {
        res.status(501).json({ message: 'Internal error' });
    }
});

export default router;