import { Request, Response } from 'express';
import { getAdminAnalytics } from '../services/analyticsService.ts';
import formatResponse from '../utils/formatResponse.ts';
import User from '../models/User.ts';
import Trip from '../models/Trip.ts';

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const analytics = await getAdminAnalytics();
    res.status(200).json(formatResponse(true, 'Analytics fetched', analytics));
  } catch (error) {
    res.status(500).json(formatResponse(false, 'Failed to fetch analytics'));
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.status(200).json(formatResponse(true, 'Users fetched', users));
  } catch (error) {
    res.status(500).json(formatResponse(false, 'Failed to fetch users'));
  }
};

export const getAllTrips = async (req: Request, res: Response) => {
  try {
    const trips = await Trip.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
    res.status(200).json(formatResponse(true, 'Trips fetched', trips));
  } catch (error) {
    res.status(500).json(formatResponse(false, 'Failed to fetch trips'));
  }
};
