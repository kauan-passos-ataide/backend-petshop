import express from 'express';
import animalsRouter from './animals'

const router = express.Router();

router.use('/animals', animalsRouter);

export default router;