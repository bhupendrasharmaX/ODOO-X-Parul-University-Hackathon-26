import api from './axios';

export const getCities = async () => {
  const response = await api.get('/cities');
  return response.data;
};

export const searchCities = async (query) => {
  const response = await api.get('/cities/search', { params: { q: query } });
  return response.data;
};
