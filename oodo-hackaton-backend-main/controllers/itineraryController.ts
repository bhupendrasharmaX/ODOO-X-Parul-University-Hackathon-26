import { Request, Response } from 'express';
import Stop from '../models/Stop.ts';
import formatResponse from '../utils/formatResponse.ts';
import { getTripTimeline } from '../services/itineraryService.ts';

export const getItinerary = async (req: Request, res: Response) => {
  try {
    const timeline = await getTripTimeline(req.params.tripId);
    res.status(200).json(formatResponse(true, 'Itinerary fetched', timeline));
  } catch (error) {
    res.status(500).json(formatResponse(false, 'Failed to fetch itinerary'));
  }
};

export const createStop = async (req: Request, res: Response) => {
  try {
    const stop = await Stop.create(req.body);
    res.status(201).json(formatResponse(true, 'Stop added to itinerary', stop));
  } catch (error) {
    res.status(400).json(formatResponse(false, 'Failed to add stop'));
  }
};

export const updateStop = async (req: Request, res: Response) => {
  try {
    const stop = await Stop.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(formatResponse(true, 'Stop updated', stop));
  } catch (error) {
    res.status(400).json(formatResponse(false, 'Failed to update stop'));
  }
};

export const deleteStop = async (req: Request, res: Response) => {
  try {
    await Stop.findByIdAndDelete(req.params.id);
    res.status(200).json(formatResponse(true, 'Stop deleted from itinerary'));
  } catch (error) {
    res.status(500).json(formatResponse(false, 'Failed to delete stop'));
  }
};
