import express from 'express';
import { getTrips, getTripById, createTrip, updateTrip, deleteTrip } from '../controllers/tripController.ts';
import { protect } from '../middleware/authMiddleware.ts';
import { tripValidation } from '../validations/tripValidation.ts';
import validateRequest from '../middleware/validateRequest.ts';

const router = express.Router();

router.route('/')
  .get(protect, getTrips)
  .post(protect, tripValidation, validateRequest, createTrip);

router.route('/:id')
  .get(protect, getTripById)
  .put(protect, tripValidation, validateRequest, updateTrip)
  .delete(protect, deleteTrip);

export default router;
