import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, Star } from 'lucide-react';

const mockCities = [
  { id: 1, name: 'Paris, France', desc: 'Experience the city of love, fashion, and unparalleled gastronomy along the Seine.', rating: 4.9, cost: 'Luxury', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=85' },
  { id: 2, name: 'Kyoto, Japan', desc: 'Discover ancient temples, traditional tea houses, and the sublime beauty of changing seasons.', rating: 4.8, cost: 'Mid', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=85' },
  { id: 3, name: 'Bali, Indonesia', desc: 'Relax on pristine beaches and explore vibrant jungle retreats in the Island of the Gods.', rating: 4.7, cost: 'Budget', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=85' },
];

const categories = [
  { id: 'All', label: 'All' },
  { id: 'Beach', label: 'Beach ⛱️' },
  { id: 'Mountain', label: 'Mountain ⛰️' },
  { id: 'Urban', label: 'Urban 🏙️' },
  { id: 'Historic', label: 'Historic 🏛️' },
];

const CitySearch = () => {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');

  return (
    <div className="pb-24 font-sans bg-[#F8FAFC] min-h-[calc(100vh-80px)]">
      <div className="px-6 md:px-10 max-w-7xl mx-auto pt-16">
        
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-12">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-surface-900 mb-12 tracking-tight text-center">Where to next?</h1>
          
          <div className="w-full max-w-2xl relative mb-12">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-surface-400" size={20} />
            <input
              type="text" placeholder="Search destinations..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border border-surface-200 rounded-2xl text-base focus:border-primary-500 outline-none shadow-sm"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map(c => (
              <button key={c.id} onClick={() => setActiveCat(c.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm border ${
                  activeCat === c.id 
                    ? 'bg-[#4f46e5] text-white border-[#4f46e5]' 
                    : 'bg-white text-surface-700 border-surface-200 hover:border-surface-300 hover:bg-surface-50'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {mockCities.map((city, idx) => (
            <motion.div key={city.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[24px] overflow-hidden group cursor-pointer border border-surface-100 flex flex-col"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}
            >
              {/* Image */}
              <div className="relative h-[240px] overflow-hidden">
                <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur text-[11px] font-bold text-surface-900 tracking-wider">
                    {city.cost}
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
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-2xl font-bold text-surface-900">{city.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Star size={14} className="text-[#b45309] fill-[#b45309]" />
                    <span className="text-[#b45309] font-bold text-sm">{city.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-surface-500 leading-relaxed">
                  {city.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitySearch;
