import { createContext, useState, useCallback } from 'react';
import { getTrips as fetchTripsAPI, createTrip as createTripAPI, updateTrip as updateTripAPI, deleteTrip as deleteTripAPI } from '../api/trips';

export const TripContext = createContext(null);

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrips = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTripsAPI();
      setTrips(data.trips || data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch trips');
    } finally {
      setLoading(false);
    }
  }, []);

  const addTrip = useCallback(async (tripData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await createTripAPI(tripData);
      const newTrip = data.trip || data;
      setTrips((prev) => [newTrip, ...prev]);
      return newTrip;
    } catch (err) {
      setError(err.message || 'Failed to create trip');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const editTrip = useCallback(async (id, tripData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await updateTripAPI(id, tripData);
      const updated = data.trip || data;
      setTrips((prev) => prev.map((t) => (t._id === id || t.id === id ? updated : t)));
      return updated;
    } catch (err) {
      setError(err.message || 'Failed to update trip');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeTrip = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteTripAPI(id);
      setTrips((prev) => prev.filter((t) => t._id !== id && t.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete trip');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const selectTrip = useCallback((trip) => {
    setCurrentTrip(trip);
  }, []);

  return (
    <TripContext.Provider
      value={{
        trips,
        currentTrip,
        loading,
        error,
        fetchTrips,
        addTrip,
        editTrip,
        removeTrip,
        selectTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
