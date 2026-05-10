import { Request, Response } from 'express';
import Trip from '../models/Trip.ts';
import formatResponse from '../utils/formatResponse.ts';
import generateShareCode from '../utils/generateShareCode.ts';
import { AuthRequest } from '../middleware/authMiddleware.ts';

export const getTrips = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const trips = await Trip.find({ userId: req.user?._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Trip.countDocuments({ userId: req.user?._id });

    res.status(200).json(formatResponse(true, 'Trips fetched', {
      trips,
      page,
      pages: Math.ceil(total / limit),
      total
    }));
  } catch (error) {
    res.status(500).json(formatResponse(false, 'Failed to fetch trips'));
  }
};

export const getTripById = async (req: AuthRequest, res: Response) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, userId: req.user?._id });
    if (!trip) return res.status(404).json(formatResponse(false, 'Trip not found'));
    res.status(200).json(formatResponse(true, 'Trip fetched', trip));
  } catch (error) {
    res.status(500).json(formatResponse(false, 'Failed to fetch trip'));
  }
};

export const createTrip = async (req: AuthRequest, res: Response) => {
  try {
    const tripData = {
      ...req.body,
      userId: req.user?._id,
      shareCode: generateShareCode()
    };
    const trip = await Trip.create(tripData);
    res.status(201).json(formatResponse(true, 'Trip created', trip));
  } catch (error) {
    res.status(400).json(formatResponse(false, 'Failed to create trip'));
  }
};

export const updateTrip = async (req: AuthRequest, res: Response) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?._id },
      req.body,
      { new: true }
    );
    if (!trip) return res.status(404).json(formatResponse(false, 'Trip not found'));
    res.status(200).json(formatResponse(true, 'Trip updated', trip));
  } catch (error) {
    res.status(400).json(formatResponse(false, 'Failed to update trip'));
  }
};

export const deleteTrip = async (req: AuthRequest, res: Response) => {
  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id, userId: req.user?._id });
    if (!trip) return res.status(404).json(formatResponse(false, 'Trip not found'));
    res.status(200).json(formatResponse(true, 'Trip deleted'));
  } catch (error) {
    res.status(500).json(formatResponse(false, 'Failed to delete trip'));
  }
};
