import api from './axios';

export const getActivities = async (params = {}) => {
  const response = await api.get('/activities', { params });
  return response.data;
};

export const createActivity = async (activityData) => {
  const response = await api.post('/activities', activityData);
  return response.data;
};
