import { Request, Response } from 'express';
import Budget from '../models/Budget.ts';
import formatResponse from '../utils/formatResponse.ts';
import { updateBudget as updateBudgetService } from '../services/budgetService.ts';

export const getBudget = async (req: Request, res: Response) => {
  try {
    const budget = await Budget.findOne({ tripId: req.params.tripId });
    if (!budget) return res.status(404).json(formatResponse(false, 'Budget not found'));
    res.status(200).json(formatResponse(true, 'Budget fetched', budget));
  } catch (error) {
    res.status(500).json(formatResponse(false, 'Failed to fetch budget'));
  }
};

export const createOrUpdateBudget = async (req: Request, res: Response) => {
  try {
    const { tripId } = req.body;
    const budget = await updateBudgetService(tripId, req.body);
    res.status(200).json(formatResponse(true, 'Budget updated', budget));
  } catch (error) {
    res.status(400).json(formatResponse(false, 'Failed to update budget'));
  }
};
