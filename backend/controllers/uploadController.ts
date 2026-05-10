import { Request, Response } from 'express';
import formatResponse from '../utils/formatResponse.ts';

export const uploadImage = (req: Request, res: Response) => {
  const file = (req as any).file;
  if (!file) {
    return res.status(400).json(formatResponse(false, 'No file uploaded'));
  }
  res.status(200).json(formatResponse(true, 'Image uploaded successfully', { url: `/${file.path}` }));
};
