import express from 'express';
import { uploadImage } from '../controllers/uploadController.ts';
import upload from '../middleware/uploadMiddleware.ts';
import { protect } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.post('/image', protect, upload.single('image'), uploadImage);

export default router;
