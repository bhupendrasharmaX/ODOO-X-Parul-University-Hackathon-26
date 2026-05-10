import express from 'express';
import { getAnalytics, getAllUsers, getAllTrips } from '../controllers/adminController.ts';
import { protect } from '../middleware/authMiddleware.ts';
import { admin } from '../middleware/adminMiddleware.ts';

const router = express.Router();

router.get('/analytics', protect, admin, getAnalytics);
router.get('/users', protect, admin, getAllUsers);
router.get('/trips', protect, admin, getAllTrips);

export default router;
