import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Map, Globe, TrendingUp, AlertTriangle, Download, Search, Trash2, Ban } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const monthlyData = [
  { name: 'Jan', trips: 42 }, { name: 'Feb', trips: 58 }, { name: 'Mar', trips: 75 },
  { name: 'Apr', trips: 89 }, { name: 'May', trips: 115 }, { name: 'Jun', trips: 142 },
  { name: 'Jul', trips: 168 }, { name: 'Aug', trips: 190 }, { name: 'Sep', trips: 175 },
  { name: 'Oct', trips: 210 }, { name: 'Nov', trips: 198 }, { name: 'Dec', trips: 230 },
];

const userRegData = [
  { name: 'Jan', users: 12 }, { name: 'Feb', users: 19 }, { name: 'Mar', users: 28 },
  { name: 'Apr', users: 35 }, { name: 'May', users: 48 }, { name: 'Jun', users: 62 },
];

const activityData = [
  { name: 'Sightseeing', count: 340 }, { name: 'Food Tours', count: 280 },
  { name: 'Adventure', count: 220 }, { name: 'Art & Culture', count: 190 },
  { name: 'Water Sports', count: 150 }, { name: 'Heritage', count: 130 },
];

const recentTrips = [
  { id: 1, user: 'Alice Johnson', destination: 'Paris, France', startDate: '2026-06-15', status: 'Active', avatar: 'A' },
  { id: 2, user: 'Bob Smith', destination: 'Tokyo, Japan', startDate: '2026-09-10', status: 'Active', avatar: 'B' },
  { id: 3, user: 'Carol White', destination: 'Bali, Indonesia', startDate: '2026-11-05', status: 'Completed', avatar: 'C' },
  { id: 4, user: 'David Lee', destination: 'Interlaken, Switzerland', startDate: '2026-07-01', status: 'Active', avatar: 'D' },
  { id: 5, user: 'Eve Martinez', destination: 'New York, USA', startDate: '2026-12-20', status: 'Cancelled', avatar: 'E' },
];

const statusConfig = {
  Active: 'badge-upcoming', Completed: 'badge-completed', Cancelled: 'badge-cancelled'
};

const avatarGradients = [
  'linear-gradient(135deg, #4f46e5, #818cf8)',
  'linear-gradient(135deg, #10b981, #34d399)',
  'linear-gradient(135deg, #f59e0b, #fbbf24)',
  'linear-gradient(135deg, #ec4899, #f472b6)',
  'linear-gradient(135deg, #8b5cf6, #a78bfa)',
];

/* Count-up hook */
const useCountUp = (end, delay = 0) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const step = Math.ceil(end / 60);
      const id = setInterval(() => {
        start = Math.min(start + step, end);
        setVal(start);
        if (start >= end) clearInterval(id);
      }, 16);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(timer);
  }, [end, delay]);
  return val;
};

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmAction, setConfirmAction] = useState(null);
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  const kpiTrips = useCountUp(1492, 0);
  const kpiUsers = useCountUp(847, 100);
  const kpiCities = useCountUp(63, 200);
  const kpiToday = useCountUp(12, 300);

  const kpis = [
    { label: 'Total Trips', value: kpiTrips, icon: <Map size={22} />, trend: '+12%', up: true, gradient: 'linear-gradient(135deg, #4f46e5, #6366f1)', shadow: 'rgba(79,70,229,0.3)' },
    { label: 'Active Users', value: kpiUsers, icon: <Users size={22} />, trend: '+8%', up: true, gradient: 'linear-gradient(135deg, #10b981, #34d399)', shadow: 'rgba(16,185,129,0.3)' },
    { label: 'Total Cities', value: kpiCities, icon: <Globe size={22} />, trend: '+5%', up: true, gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)', shadow: 'rgba(245,158,11,0.3)' },
    { label: 'New Today', value: kpiToday, icon: <TrendingUp size={22} />, trend: '-3%', up: false, gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)', shadow: 'rgba(139,92,246,0.3)' },
  ];

  const filteredTrips = recentTrips.filter(t =>
    !searchQuery || t.user.toLowerCase().includes(searchQuery.toLowerCase()) || t.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-16 font-sans">
      {/* Header */}
      <div className="px-6 md:px-10 pt-12 pb-4 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold text-surface-900 mb-1" style={{ letterSpacing: '-0.02em' }}>Control Center</h1>
          <p className="text-surface-500 text-sm">{today}</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-white border border-surface-200 rounded-xl font-bold text-sm text-surface-700 hover:border-surface-300 hover:shadow-sm transition-all">
          <Download size={18} /> Export Report
        </button>
      </div>

      <div className="px-6 md:px-10 max-w-7xl mx-auto space-y-12">
        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {kpis.map((kpi, idx) => (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}
              className="bg-white rounded-[20px] p-6 transition-all duration-250"
              style={{ boxShadow: 'var(--shadow-card)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-hover)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md" style={{ background: kpi.gradient, boxShadow: `0 4px 12px ${kpi.shadow}` }}>
                  {kpi.icon}
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${kpi.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                  {kpi.trend}
                </span>
              </div>
              <p className="text-3xl font-extrabold text-surface-900 mb-1">{kpi.value.toLocaleString()}</p>
              <p className="text-surface-400 text-sm font-semibold">{kpi.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Area chart */}
          <div className="lg:col-span-3 bg-white rounded-[20px] p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
            <h2 className="font-display text-xl font-semibold text-surface-900 mb-6">Trip Growth</h2>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthlyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="tripGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#f1f5f9" strokeDasharray="0" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontFamily: 'Plus Jakarta Sans' }} />
                <Area type="monotone" dataKey="trips" stroke="#4f46e5" strokeWidth={2.5} fill="url(#tripGrad)" dot={false} activeDot={{ r: 5, fill: '#4f46e5' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Bar chart */}
          <div className="lg:col-span-2 bg-white rounded-[20px] p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
            <h2 className="font-display text-xl font-semibold text-surface-900 mb-6">Registrations</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={userRegData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="#f1f5f9" strokeDasharray="0" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="users" fill="#4f46e5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activities horizontal bar */}
        <div className="bg-white rounded-[20px] p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
          <h2 className="font-display text-xl font-semibold text-surface-900 mb-6">Activity Popularity</h2>
          <div className="space-y-4">
            {activityData.map(item => (
              <div key={item.name} className="flex items-center gap-8">
                <span className="text-sm font-semibold text-surface-700 w-28 shrink-0">{item.name}</span>
                <div className="flex-1 bg-surface-100 rounded-full h-3 overflow-hidden">
                  <motion.div className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #4f46e5, #818cf8)', width: `${(item.count / activityData[0].count) * 100}%` }}
                    initial={{ width: 0 }} animate={{ width: `${(item.count / activityData[0].count) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }} />
                </div>
                <span className="text-sm font-bold text-surface-900 w-10 text-right">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-[20px] overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-8 border-b border-surface-100">
            <h2 className="font-display text-xl font-semibold text-surface-900">Recent Trip Requests</h2>
            <div className="relative w-full sm:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
              <input type="text" placeholder="Search users..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-surface-200 rounded-xl text-sm focus:border-primary-500 outline-none" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-surface-50 border-b border-surface-100">
                  {['User', 'Destination', 'Start Date', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-6 py-4 text-xs font-bold text-surface-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTrips.map((trip, idx) => (
                  <tr key={trip.id}
                    className="border-b border-surface-100 transition-colors group"
                    style={{ background: idx % 2 === 1 ? '#f8fafc' : 'white' }}
                    onMouseEnter={e => { e.currentTarget.style.borderLeft = '3px solid #4f46e5'; e.currentTarget.style.background = '#eef2ff'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderLeft = '3px solid transparent'; e.currentTarget.style.background = idx % 2 === 1 ? '#f8fafc' : 'white'; }}
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                        style={{ background: avatarGradients[idx % avatarGradients.length] }}>
                        {trip.avatar}
                      </div>
                      <span className="font-semibold text-surface-900 text-sm">{trip.user}</span>
                    </td>
                    <td className="px-6 py-4 text-surface-600 text-sm font-medium">{trip.destination}</td>
                    <td className="px-6 py-4 text-surface-500 text-sm">{new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${statusConfig[trip.status]}`}>
                        {trip.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setConfirmAction({ type: 'suspend', user: trip.user })}
                          className="p-2 text-surface-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all" title="Suspend">
                          <Ban size={16} />
                        </button>
                        <button onClick={() => setConfirmAction({ type: 'delete', user: trip.user })}
                          className="p-2 text-surface-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-surface-100 text-center">
            <button className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">Load More</button>
          </div>
        </div>
      </div>

      {/* Confirm Dialog */}
      {confirmAction && (
        <div className="fixed inset-0 bg-surface-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[24px] p-8 max-w-sm w-full text-center" style={{ boxShadow: 'var(--shadow-modal)' }}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${confirmAction.type === 'delete' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
              <AlertTriangle size={28} />
            </div>
            <h3 className="font-display text-xl font-bold text-surface-900 mb-2">
              {confirmAction.type === 'delete' ? 'Delete User?' : 'Suspend User?'}
            </h3>
            <p className="text-surface-500 text-sm mb-6">
              Are you sure you want to {confirmAction.type} <strong>{confirmAction.user}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmAction(null)} className="flex-1 py-3 bg-surface-100 text-surface-700 font-bold rounded-xl hover:bg-surface-200 transition-colors">
                Cancel
              </button>
              <button onClick={() => setConfirmAction(null)}
                className={`flex-1 py-3 text-white font-bold rounded-xl transition-colors ${confirmAction.type === 'delete' ? 'bg-red-500 hover:bg-red-600' : 'bg-amber-500 hover:bg-amber-600'}`}>
                {confirmAction.type === 'delete' ? 'Delete' : 'Suspend'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
