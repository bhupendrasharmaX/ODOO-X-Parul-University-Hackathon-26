export const calculateTotalBudget = (budget: {
  transport: number;
  stay: number;
  food: number;
  activities: number;
  miscellaneous: number;
}) => {
  const total = budget.transport + budget.stay + budget.food + budget.activities + budget.miscellaneous;
  return total;
};

export const calculateAveragePerDay = (total: number, days: number) => {
  return days > 0 ? total / days : total;
};
