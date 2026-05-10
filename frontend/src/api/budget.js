import api from './axios';

export const getBudget = async (tripId) => {
  const response = await api.get(`/budget/${tripId}`);
  return response.data;
};

// Matches backend createOrUpdateBudget — creates or updates the budget for a trip
export const createOrUpdateBudget = async (budgetData) => {
  const response = await api.post('/budget', budgetData);
  return response.data;
};

// Alias kept for backwards compatibility with existing UI code
export const addExpense = createOrUpdateBudget;
