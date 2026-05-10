import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import formatResponse from '../utils/formatResponse.ts';

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(formatResponse(false, 'Validation Errors', null, errors.array()));
  }
  next();
};

export default validateRequest;
