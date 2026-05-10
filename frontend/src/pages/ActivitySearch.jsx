import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, MapPin, Clock, Star, SlidersHorizontal } from 'lucide-react';

const mockActivities = [
  { id: 1, name: 'Private Blue Hole Expedition', location: 'Belize Barrier Reef', category: 'ADVENTURE', rating: 4.9, reviews: 120, duration: '6h', price: 450, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=85' },
  { id: 2, name: 'Masterclass: Edomae Sushi', location: 'Ginza, Tokyo', category: 'CULTURE & CULINARY', rating: 5.0, reviews: 84, duration: '3h', price: 320, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=85' },
  { id: 3, name: 'Sunrise Balloon Flight', location: 'Cappadocia, Turkey', category: 'SIGHTSEEING', rating: 4.8, reviews: '2k+', duration: '4h', price: 280, image: 'https://images.unsplash.com/photo-1527561135758-154df663f738?w=600&q=85' },
];

const ActivitySearch = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="pb-24 font-sans bg-[#F8FAFC] min-h-[calc(100vh-80px)]">
      <div className="px-6 md:px-10 max-w-7xl mx-auto pt-12">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="font-display text-4xl font-bold text-surface-900 mb-2">Discover Experiences</h1>
            <p className="text-surface-500 text-sm">Curated adventures and exclusive access for your next itinerary.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
              <input
                type="text" placeholder="Search activities..." value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-surface-200 rounded-xl text-sm focus:border-primary-500 outline-none shadow-sm"
              />
            </div>
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-surface-200 rounded-xl text-sm font-semibold text-surface-700 hover:bg-surface-50 shadow-sm transition-colors">
              <SlidersHorizontal size={18} /> Filters
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {mockActivities.map((act, idx) => (
            <motion.div key={act.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[24px] overflow-hidden group cursor-pointer border border-surface-100 flex flex-col"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}
            >
              {/* Image */}
              <div className="relative h-[260px] overflow-hidden">
                <img src={act.image} alt={act.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-[10px] font-bold text-[#4f46e5] tracking-wider uppercase">
                    {act.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-surface-400 hover:text-red-500 hover:scale-110 transition-all shadow-sm">
                    <Heart size={18} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display text-2xl font-bold text-surface-900 mb-2 leading-snug">{act.name}</h3>
                <p className="flex items-center gap-1.5 text-sm text-surface-500 mb-6">
                  <MapPin size={16} className="text-surface-400" /> {act.location}
                </p>
                
                <div className="mt-auto pt-4 border-t border-surface-100 flex items-center justify-between text-sm font-medium">
                  <div className="flex items-center gap-1.5">
                    <Star size={16} className="text-[#f59e0b] fill-[#f59e0b]" />
                    <span className="text-[#4f46e5] font-bold">{act.rating}</span>
                    <span className="text-surface-400">({act.reviews})</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-surface-500"><Clock size={16} /> {act.duration}</span>
                    <span className="font-bold text-surface-900">${act.price}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivitySearch;
