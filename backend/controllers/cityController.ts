import { Request, Response } from 'express';
import City from '../models/City.ts';
import formatResponse from '../utils/formatResponse.ts';

export const getCities = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const cities = await City.find({})
      .sort({ popularity: -1 })
      .skip(skip)
      .limit(limit);

    const total = await City.countDocuments({});

    res.status(200).json(formatResponse(true, 'Cities fetched', {
      cities,
      page,
      pages: Math.ceil(total / limit),
      total
    }));
  } catch (error) {
    res.status(500).json(formatResponse(false, 'Failed to fetch cities'));
  }
};

export const searchCities = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    const cities = await City.find({
      $or: [
        { name: { $regex: q as string, $options: 'i' } },
        { country: { $regex: q as string, $options: 'i' } }
      ]
    });
    res.status(200).json(formatResponse(true, 'Cities found', cities));
  } catch (error) {
    res.status(500).json(formatResponse(false, 'Search failed'));
  }
};
