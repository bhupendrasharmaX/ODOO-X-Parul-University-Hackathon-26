import express from 'express';
import { getBudget, createOrUpdateBudget } from '../controllers/budgetController.ts';
import { protect } from '../middleware/authMiddleware.ts';
import { budgetValidation } from '../validations/budgetValidation.ts';
import validateRequest from '../middleware/validateRequest.ts';

const router = express.Router();

router.get('/:tripId', protect, getBudget);
router.post('/', protect, budgetValidation, validateRequest, createOrUpdateBudget);

export default router;
