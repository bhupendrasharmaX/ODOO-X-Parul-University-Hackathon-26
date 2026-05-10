import api from './axios';

export const getNotes = async (tripId) => {
  const response = await api.get(`/notes/${tripId}`);
  return response.data;
};

export const addNote = async (noteData) => {
  const response = await api.post('/notes', noteData);
  return response.data;
};

export const updateNote = async (id, noteData) => {
  const response = await api.put(`/notes/${id}`, noteData);
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};
