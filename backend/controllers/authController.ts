import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService.ts';
import { googleLoginService } from '../services/googleAuthService.ts';
import formatResponse from '../utils/formatResponse.ts';
import User from '../models/User.ts';
import { AuthRequest } from '../middleware/authMiddleware.ts';

export const register = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(formatResponse(true, 'User registered successfully', result));
  } catch (error) {
    res.status(400).json(formatResponse(false, error instanceof Error ? error.message : 'Registration failed'));
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(200).json(formatResponse(true, 'Login successful', result));
  } catch (error) {
    res.status(401).json(formatResponse(false, error instanceof Error ? error.message : 'Login failed'));
  }
};

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const token = req.body.access_token || req.body.idToken;
    if (!token) {
      res.status(400).json(formatResponse(false, 'Google token is required'));
      return;
    }
    const result = await googleLoginService(token);
    res.status(200).json(formatResponse(true, 'Google login successful', result));
  } catch (error) {
    res.status(401).json(formatResponse(false, error instanceof Error ? error.message : 'Google login failed'));
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?._id).select('-password');
    res.status(200).json(formatResponse(true, 'User data fetched', user));
  } catch (error) {
    res.status(500).json(formatResponse(false, 'Failed to fetch user data'));
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  // Mock logic for forgot password
  res.status(200).json(formatResponse(true, 'Password reset link sent to email'));
};
