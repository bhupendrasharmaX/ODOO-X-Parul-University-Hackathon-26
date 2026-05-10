import Stop from '../models/Stop.ts';
import { generateTimeline } from '../utils/generateTimeline.ts';

export const getTripTimeline = async (tripId: string) => {
  const stops = await Stop.find({ tripId }).populate('cityId');
  return generateTimeline(stops);
};
