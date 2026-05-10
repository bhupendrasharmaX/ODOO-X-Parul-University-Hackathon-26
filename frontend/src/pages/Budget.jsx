import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { ArrowLeft, Wallet, AlertTriangle, Car, Home, Coffee, Activity } from 'lucide-react';

const mockBudget = {
  totalBudget: 5000,
  totalSpent: 3850,
  daysTotal: 10,
  categories: [
    { name: 'Transport', value: 1200, color: '#4f46e5', icon: <Car size={18} /> },
    { name: 'Accommodation', value: 1500, color: '#8b5cf6', icon: <Home size={18} /> },
    { name: 'Food & Dining', value: 750, color: '#f59e0b', icon: <Coffee size={18} /> },
    { name: 'Activities', value: 400, color: '#10b981', icon: <Activity size={18} /> },
  ],
  dailySpend: [
    { day: 'Day 1', amount: 320 }, { day: 'Day 2', amount: 450 },
    { day: 'Day 3', amount: 380 }, { day: 'Day 4', amount: 520 },
    { day: 'Day 5', amount: 290 }, { day: 'Day 6', amount: 610 },
    { day: 'Day 7', amount: 480 }, { day: 'Day 8', amount: 340 },
    { day: 'Day 9', amount: 260 }, { day: 'Day 10', amount: 200 },
  ]
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl p-3 shadow-lg border border-surface-100 text-sm">
      <p className="font-bold text-surface-900">{payload[0].name}</p>
      <p className="text-surface-600">${payload[0].value.toLocaleString()}</p>
    </div>
  );
};

const Budget = () => {
  const { totalBudget, totalSpent, daysTotal, categories, dailySpend } = mockBudget;
  const remaining = totalBudget - totalSpent;
  const spentPct = Math.round((totalSpent / totalBudget) * 100);
  const isOver = remaining < 0;
  const avgPerDay = Math.round(totalSpent / daysTotal);
  const [bars, setBars] = useState(false);

  useEffect(() => { const t = setTimeout(() => setBars(true), 400); return () => clearTimeout(t); }, []);

  const donutData = categories.map(c => ({ name: c.name, value: c.value }));

  return (
    <div className="pb-16 font-sans">
      {/* Over budget alert */}
      {isOver && (
        <div className="mx-6 md:mx-10 mt-6 p-4 rounded-2xl flex items-center gap-3 text-white font-semibold text-sm"
          style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
          <AlertTriangle size={20} /> You are over budget by ${Math.abs(remaining).toLocaleString()}! Review your spending.
        </div>
      )}

      <div className="px-6 md:px-10 pt-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="font-display text-4xl font-bold text-surface-900 mb-1" style={{ letterSpacing: '-0.02em' }}>Trip Budget</h1>
            <p className="text-surface-500 text-sm">Summer in Paris · 10 days</p>
          </div>
          <Link to="/trips" className="p-2.5 bg-white border border-surface-200 rounded-xl hover:bg-surface-50 transition-colors text-surface-600">
            <ArrowLeft size={20} />
          </Link>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {/* Total Budget */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-[20px] p-6 text-white"
            style={{ background: 'linear-gradient(135deg, #4f46e5, #4338ca)', boxShadow: '0 4px 20px rgba(79,70,229,0.35)' }}>
            <div className="flex items-center gap-2 mb-3 opacity-80"><Wallet size={18} /><span className="text-sm font-semibold">Total Budget</span></div>
            <p className="font-display text-3xl font-bold">${totalBudget.toLocaleString()}</p>
          </motion.div>

          {/* Total Spent */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white rounded-[20px] p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
            <p className="text-surface-500 text-sm font-semibold mb-2">Total Spent</p>
            <p className="font-display text-3xl font-bold text-surface-900 mb-3">${totalSpent.toLocaleString()}</p>
            <div className="w-full bg-surface-100 rounded-full h-2.5 overflow-hidden">
              <motion.div className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, #4f46e5, #818cf8)` }}
                initial={{ width: 0 }} animate={{ width: `${spentPct}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }} />
            </div>
            <p className="text-xs text-surface-400 mt-1.5 font-medium">{spentPct}% of budget used</p>
          </motion.div>

          {/* Remaining */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white rounded-[20px] p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
            <p className="text-surface-500 text-sm font-semibold mb-2">Remaining</p>
            <p className={`font-display text-3xl font-bold mb-2 ${isOver ? 'text-red-500' : 'text-emerald-500'}`}>
              {isOver ? '-' : ''}${Math.abs(remaining).toLocaleString()}
            </p>
            {isOver
              ? <span className="text-xs font-bold text-red-400 bg-red-50 px-2.5 py-1 rounded-full flex items-center gap-1 w-fit"><AlertTriangle size={12} /> Over Budget</span>
              : <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full w-fit block">On Track ✓</span>
            }
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          {/* Donut Chart */}
          <div className="lg:col-span-2 bg-white rounded-[20px] p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
            <h2 className="font-display text-xl font-semibold text-surface-900 mb-4">Spending Breakdown</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={donutData} cx="50%" cy="50%" innerRadius={60} outerRadius={90}
                  dataKey="value" startAngle={90} endAngle={-270}
                  paddingAngle={3} cornerRadius={6}>
                  {donutData.map((_, i) => (
                    <Cell key={i} fill={categories[i].color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              {categories.map(c => (
                <div key={c.name} className="flex items-center gap-1.5 text-xs font-semibold text-surface-600">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                  {c.name}
                </div>
              ))}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="lg:col-span-3 bg-white rounded-[20px] p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
            <h2 className="font-display text-xl font-semibold text-surface-900 mb-6">Category Breakdown</h2>
            <div className="space-y-5">
              {categories.map((cat, i) => {
                const pct = Math.round((cat.value / totalSpent) * 100);
                return (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm"
                          style={{ backgroundColor: cat.color }}>
                          {cat.icon}
                        </div>
                        <span className="font-semibold text-surface-800 text-sm">{cat.name}</span>
                      </div>
                      <span className="font-bold text-surface-900 text-sm">${cat.value.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-surface-100 rounded-full h-2.5 overflow-hidden">
                      <motion.div className="h-full rounded-full"
                        style={{ backgroundColor: cat.color }}
                        initial={{ width: 0 }}
                        animate={{ width: bars ? `${pct}%` : 0 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 + i * 0.1 }} />
                    </div>
                    <p className="text-xs text-surface-400 mt-1 font-medium">{pct}% of spent</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Daily Bar Chart */}
        <div className="bg-white rounded-[20px] p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold text-surface-900">Daily Spending</h2>
            <div className="px-3 py-1.5 bg-surface-50 rounded-xl border border-surface-100">
              <span className="text-sm font-bold text-surface-700">Avg: <span className="text-primary-600">${avgPerDay}/day</span></span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dailySpend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#f1f5f9" strokeDasharray="0" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
              <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} formatter={v => [`$${v}`, 'Spent']} />
              <Bar dataKey="amount" fill="#4f46e5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Budget;
