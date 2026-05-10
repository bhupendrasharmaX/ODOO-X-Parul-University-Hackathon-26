import express from 'express';
import { getActivities, createActivity } from '../controllers/activityController.ts';

const router = express.Router();

router.get('/', getActivities);
router.post('/', createActivity);

export default router;
