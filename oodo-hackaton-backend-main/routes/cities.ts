import express from 'express';
import { getCities, searchCities } from '../controllers/cityController.ts';

const router = express.Router();

router.get('/', getCities);
router.get('/search', searchCities);

export default router;
