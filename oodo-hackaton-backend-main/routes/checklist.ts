import express from 'express';
import { getChecklist, createChecklistItem, updateChecklistItem, deleteChecklistItem } from '../controllers/checklistController.ts';
import { protect } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.get('/:tripId', protect, getChecklist);
router.post('/', protect, createChecklistItem);
router.put('/:id', protect, updateChecklistItem);
router.delete('/:id', protect, deleteChecklistItem);

export default router;
