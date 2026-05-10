import { body } from 'express-validator';

export const budgetValidation = [
  body('transport').isNumeric().optional(),
  body('stay').isNumeric().optional(),
  body('food').isNumeric().optional(),
  body('activities').isNumeric().optional(),
  body('miscellaneous').isNumeric().optional(),
];
