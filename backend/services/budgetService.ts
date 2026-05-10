import Budget from '../models/Budget.ts';
import { calculateTotalBudget, calculateAveragePerDay } from '../utils/calculateBudget.ts';

export const updateBudget = async (tripId: string, budgetData: any) => {
  const totalCost = calculateTotalBudget(budgetData);
  // Assuming duration is passed or calculated elsewhere, here we just update totals
  const budget = await Budget.findOneAndUpdate(
    { tripId },
    { ...budgetData, totalCost },
    { new: true, upsert: true }
  );
  return budget;
};
