import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware.ts';
import formatResponse from '../utils/formatResponse.ts';

export const admin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json(formatResponse(false, 'Not authorized as an admin'));
  }
};
