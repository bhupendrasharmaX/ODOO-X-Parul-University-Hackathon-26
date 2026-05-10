import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Heart, Plus } from 'lucide-react';

const mockTrips = [
  { id: 1, name: 'Paris Escapade', startDate: '2024-10-15', endDate: '2024-10-22', status: 'Upcoming', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=85' },
  { id: 2, name: 'Kyoto Retreat', startDate: '2024-04-02', endDate: '2024-04-10', status: 'Completed', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=85' },
  { id: 3, name: 'Swiss Alps Winter', startDate: '', endDate: '', status: 'Draft', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=85' },
];

const statusConfig = {
  Upcoming: { label: 'UPCOMING', className: 'bg-[#4f46e5] text-white' },
  Completed: { label: 'COMPLETED', className: 'bg-white/80 backdrop-blur text-surface-900' },
  Draft: { label: 'DRAFT', className: 'bg-[#f59e0b] text-white' },
};

const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    setTimeout(() => { setTrips(mockTrips); setLoading(false); }, 600);
  }, []);

  const filters = ['All', 'Upcoming', 'Completed', 'Draft'];
  const filteredTrips = trips.filter(trip => filter === 'All' || trip.status === filter);

  return (
    <div className="pb-16 font-sans bg-[#F8FAFC] min-h-[calc(100vh-80px)]">
      <div className="px-6 md:px-10 max-w-7xl mx-auto pt-12">
        
        {/* Header Area */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          
          {/* Toggles */}
          <div className="flex bg-[#F1F5F9] border border-surface-200 rounded-xl p-1 gap-1">
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-lg text-sm transition-all font-semibold ${
                  filter === f ? 'bg-white text-surface-900 shadow-sm' : 'text-surface-500 hover:text-surface-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <Link to="/create-trip" className="flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-bold text-sm whitespace-nowrap transition-transform hover:scale-105"
            style={{ background: '#4f46e5', boxShadow: '0 4px 14px rgba(79,70,229,0.3)' }}>
            <Plus size={18} /> New Trip
          </Link>
        </div>

        {/* Trips Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <div key={i} className="h-[320px] skeleton rounded-[20px]" />)}
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTrips.map((trip, idx) => (
                <motion.div key={trip.id} layout
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-[20px] overflow-hidden group cursor-pointer border border-surface-100"
                  style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}
                >
                  {/* Image Container */}
                  <div className="relative h-[220px] overflow-hidden">
                    <img src={trip.image} alt={trip.name} loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                    
                    {/* Status badge top-right */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider ${statusConfig[trip.status]?.className}`}>
                        {statusConfig[trip.status]?.label}
                      </span>
                    </div>
                  </div>

                  {/* Content below image */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-display text-2xl font-semibold text-surface-900">{trip.name}</h3>
                      <button className="text-surface-400 hover:text-red-500 transition-colors">
                        <Heart size={20} />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2 text-surface-500 text-sm font-medium">
                      <Calendar size={14} />
                      {trip.startDate && trip.endDate ? (
                        <span>
                          {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      ) : (
                        <span>Dates TBD</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default MyTrips;
