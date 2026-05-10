import api from './axios';

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  const data = response.data.data;
  return { token: data.token, user: data };
};

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  const data = response.data.data;
  return { token: data.token, user: data };
};

export const forgotPassword = async (email) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

export const googleLogin = async (accessToken) => {
  const response = await api.post('/auth/google', { access_token: accessToken });
  const data = response.data.data;
  return { token: data.token, user: data };
};

// Fetch the currently logged-in user (requires JWT)
export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};
