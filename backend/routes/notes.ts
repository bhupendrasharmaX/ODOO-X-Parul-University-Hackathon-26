import express from 'express';
import { getNotes, createNote, updateNote, deleteNote } from '../controllers/notesController.ts';
import { protect } from '../middleware/authMiddleware.ts';
import { noteValidation } from '../validations/noteValidation.ts';
import validateRequest from '../middleware/validateRequest.ts';

const router = express.Router();

router.get('/:tripId', protect, getNotes);
router.post('/', protect, noteValidation, validateRequest, createNote);
router.put('/:id', protect, noteValidation, validateRequest, updateNote);
router.delete('/:id', protect, deleteNote);

export default router;
