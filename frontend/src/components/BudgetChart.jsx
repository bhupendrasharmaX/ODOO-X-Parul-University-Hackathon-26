import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '../utils/helpers';

const BudgetChart = ({ expenses = [], totalBudget = 0 }) => {
  const categories = {};
  expenses.forEach((exp) => {
    const cat = exp.category || 'Other';
    categories[cat] = (categories[cat] || 0) + (exp.amount || 0);
  });

  const amounts = Object.values(categories);
  const totalSpent = amounts.reduce((a, b) => a + b, 0);
  const remaining = Math.max(totalBudget - totalSpent, 0);

  const data = Object.keys(categories).map((key) => ({
    name: key,
    value: categories[key],
  }));

  if (remaining > 0) {
    data.push({ name: 'Remaining', value: remaining });
  }

  const COLORS = [
    '#6366f1', '#0ea5e9', '#10b981', '#f59e0b',
    '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6',
  ];
  const REMAINING_COLOR = '#e2e8f0';

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-surface-100 shadow-xl rounded-xl p-3 text-sm">
          <p className="font-semibold text-surface-900 mb-1">{payload[0].name}</p>
          <p className="text-primary-600 font-bold">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-surface-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-surface-900 text-lg">Budget Overview</h3>
          <p className="text-xs text-surface-500 mt-1">Track your trip expenses</p>
        </div>
        <div className="text-right bg-primary-50 px-3 py-1.5 rounded-xl border border-primary-100">
          <span className="text-sm font-bold text-primary-700">
            {formatCurrency(totalSpent)} <span className="text-primary-400 font-medium">/ {formatCurrency(totalBudget)}</span>
          </span>
        </div>
      </div>
      
      <div className="relative h-64">
        {data.length > (remaining > 0 ? 1 : 0) ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.name === 'Remaining' ? REMAINING_COLOR : COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ fontSize: '12px', color: '#475569' }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-surface-400">
            <div className="w-16 h-16 rounded-full bg-surface-100 flex items-center justify-center mb-3">
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-sm font-medium">No expenses yet</p>
          </div>
        )}
        
        {data.length > (remaining > 0 ? 1 : 0) && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginTop: '-20px' }}>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-surface-900">
                {totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0}%
              </p>
              <p className="text-xs text-surface-400 font-medium uppercase tracking-wider mt-0.5">Spent</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetChart;
