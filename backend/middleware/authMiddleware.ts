import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User.ts';
import formatResponse from '../utils/formatResponse.ts';

export interface AuthRequest extends Request {
  user?: IUser;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(401).json(formatResponse(false, 'Not authorized, user not found'));
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json(formatResponse(false, 'Not authorized, token failed'));
    }
  }

  if (!token) {
    res.status(401).json(formatResponse(false, 'Not authorized, no token'));
  }
};
