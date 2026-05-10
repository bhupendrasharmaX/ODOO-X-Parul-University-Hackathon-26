import api from './axios';

export const getAnalytics = async () => {
  const response = await api.get('/admin/analytics');
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const getAllTrips = async () => {
  const response = await api.get('/admin/trips');
  return response.data;
};
