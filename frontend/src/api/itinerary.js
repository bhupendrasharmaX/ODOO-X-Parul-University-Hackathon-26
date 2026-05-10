import api from './axios';

export const getItinerary = async (tripId) => {
  const response = await api.get(`/itinerary/${tripId}`);
  return response.data;
};

export const createStop = async (itineraryData) => {
  const response = await api.post('/itinerary', itineraryData);
  return response.data;
};

export const updateStop = async (id, itineraryData) => {
  const response = await api.put(`/itinerary/${id}`, itineraryData);
  return response.data;
};

export const deleteStop = async (id) => {
  const response = await api.delete(`/itinerary/${id}`);
  return response.data;
};
