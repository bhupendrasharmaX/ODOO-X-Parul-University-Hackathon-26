import { Request, Response } from 'express';
import Activity from '../models/Activity.ts';
import formatResponse from '../utils/formatResponse.ts';

export const getActivities = async (req: Request, res: Response) => {
  try {
    const { cityId } = req.query;
    const filter = cityId ? { cityId: cityId as string } : {};
    const activities = await Activity.find(filter).populate('cityId');
    res.status(200).json(formatResponse(true, 'Activities fetched', activities));
  } catch (error) {
    res.status(500).json(formatResponse(false, 'Failed to fetch activities'));
  }
};

export const createActivity = async (req: Request, res: Response) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(formatResponse(true, 'Activity created', activity));
  } catch (error) {
    res.status(400).json(formatResponse(false, 'Failed to create activity'));
  }
};
