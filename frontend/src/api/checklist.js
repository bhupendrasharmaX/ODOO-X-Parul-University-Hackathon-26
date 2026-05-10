import api from './axios';

export const getChecklist = async (tripId) => {
  const response = await api.get(`/checklist/${tripId}`);
  return response.data;
};

export const addChecklistItem = async (itemData) => {
  const response = await api.post('/checklist', itemData);
  return response.data;
};

export const updateChecklistItem = async (id, itemData) => {
  const response = await api.put(`/checklist/${id}`, itemData);
  return response.data;
};

export const deleteChecklistItem = async (id) => {
  const response = await api.delete(`/checklist/${id}`);
  return response.data;
};
