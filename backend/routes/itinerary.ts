import express from 'express';
import { getItinerary, createStop, updateStop, deleteStop } from '../controllers/itineraryController.ts';
import { protect } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.get('/:tripId', protect, getItinerary);
router.post('/', protect, createStop);
router.put('/:id', protect, updateStop);
router.delete('/:id', protect, deleteStop);

export default router;
