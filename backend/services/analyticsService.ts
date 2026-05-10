import User from '../models/User.ts';
import Trip from '../models/Trip.ts';
import City from '../models/City.ts';

export const getAdminAnalytics = async () => {
  const totalUsers = await User.countDocuments();
  const totalTrips = await Trip.countDocuments();
  const publicTripsCount = await Trip.countDocuments({ isPublic: true });
  
  // Basic aggregation for popular cities (mock logic for demo purposes)
  const popularCities = await City.find({ popularity: { $gt: 50 } }).limit(5);

  return {
    totalUsers,
    totalTrips,
    publicTripsCount,
    popularCities,
    growthRate: '15%' // Mock growth rate
  };
};
