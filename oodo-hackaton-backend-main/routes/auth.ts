import express from 'express';
import { register, login, getMe, forgotPassword } from '../controllers/authController.ts';
import { registerValidation, loginValidation } from '../validations/authValidation.ts';
import validateRequest from '../middleware/validateRequest.ts';
import { protect } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login);
router.post('/forgot-password', forgotPassword);
router.get('/me', protect, getMe);

export default router;
