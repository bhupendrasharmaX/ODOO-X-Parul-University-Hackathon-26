import { Request, Response } from 'express';
import ChecklistItem from '../models/ChecklistItem.ts';
import formatResponse from '../utils/formatResponse.ts';

export const getChecklist = async (req: Request, res: Response) => {
  try {
    const items = await ChecklistItem.find({ tripId: req.params.tripId });
    res.status(200).json(formatResponse(true, 'Checklist fetched', items));
  } catch (error) {
    res.status(500).json(formatResponse(false, 'Failed to fetch checklist'));
  }
};

export const createChecklistItem = async (req: Request, res: Response) => {
  try {
    const item = await ChecklistItem.create(req.body);
    res.status(201).json(formatResponse(true, 'Item added to checklist', item));
  } catch (error) {
    res.status(400).json(formatResponse(false, 'Failed to add item'));
  }
};

export const updateChecklistItem = async (req: Request, res: Response) => {
  try {
    const item = await ChecklistItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(formatResponse(true, 'Item updated', item));
  } catch (error) {
    res.status(400).json(formatResponse(false, 'Failed to update item'));
  }
};

export const deleteChecklistItem = async (req: Request, res: Response) => {
  try {
    await ChecklistItem.findByIdAndDelete(req.params.id);
    res.status(200).json(formatResponse(true, 'Item deleted'));
  } catch (error) {
    res.status(500).json(formatResponse(false, 'Failed to delete item'));
  }
};
