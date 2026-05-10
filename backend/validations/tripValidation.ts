import { body } from 'express-validator';

export const tripValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
];
