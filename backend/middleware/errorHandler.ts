import { Request, Response, NextFunction } from 'express';
import formatResponse from '../utils/formatResponse.ts';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json(formatResponse(false, err.message || 'Server Error', null, process.env.NODE_ENV === 'production' ? [] : [err.stack]));
};

export default errorHandler;
