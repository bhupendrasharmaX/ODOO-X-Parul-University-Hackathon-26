import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, ChevronDown, ChevronUp } from 'lucide-react';

const initCategories = [
  {
    id: 'essentials', name: 'Essentials', icon: '🛂', total: 8,
    items: [
      { id: 'e1', name: 'Passport & Visa', packed: true },
      { id: 'e2', name: 'Flight Tickets (Digital & Print)', packed: true },
      { id: 'e3', name: 'Travel Insurance', packed: true },
    ]
  },
  {
    id: 'apparel', name: 'Apparel', icon: '🧥', subtitle: 'Autumn Layers', total: 20,
    items: [
      { id: 'a1', name: 'Light Jackets (x2)', packed: true },
      { id: 'a2', name: 'Sweaters & Cardigans (x4)', packed: false },
      { id: 'a3', name: 'Comfortable Walking Shoes', packed: false, badge: 'Crucial' },
      { id: 'a4', name: 'Evening Attire (x1)', packed: false },
    ]
  }
];

const ProgressRing = ({ percent }) => {
  const r = 26, circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width="64" height="64" className="rotate-[-90deg]">
      <circle cx="32" cy="32" r={r} fill="none" stroke="#e2e8f0" strokeWidth="6" />
      <motion.circle cx="32" cy="32" r={r} fill="none" stroke="#4f46e5" strokeWidth="6"
        strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} />
    </svg>
  );
};

const PackingChecklist = () => {
  const [categories, setCategories] = useState(initCategories);
  const [expanded, setExpanded] = useState({ essentials: true, apparel: true });

  const toggleItem = (catId, itemId) => {
    setCategories(cats => cats.map(cat =>
      cat.id === catId ? { ...cat, items: cat.items.map(it => it.id === itemId ? { ...it, packed: !it.packed } : it) } : cat
    ));
  };

  return (
    <div className="pb-24 font-sans bg-[#F8FAFC] min-h-[calc(100vh-80px)]">
      <div className="px-6 md:px-10 max-w-6xl mx-auto pt-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h1 className="font-display text-5xl font-bold text-[#4f46e5] mb-3 tracking-tight">Packing for Kyoto</h1>
            <p className="text-surface-600 text-lg leading-relaxed">
              Your personalized checklist for an autumn journey. The weather will be crisp, layer up.
            </p>
          </div>
          
          <div className="bg-[#F8F9FE] border border-primary-100 rounded-[24px] p-6 flex items-center gap-6 shadow-[0_4px_24px_rgba(79,70,229,0.06)] min-w-[280px]">
            <div className="relative">
              <ProgressRing percent={65} />
              <div className="absolute inset-0 flex items-center justify-center font-bold text-sm text-surface-900">
                65%
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-surface-400 mb-1">Status</p>
              <p className="text-surface-900 font-bold text-base mb-0.5">32 / 49 Items</p>
              <p className="text-[#4f46e5] text-xs font-semibold">Ready for takeoff</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {categories.map(cat => {
            const packedCount = cat.items.filter(i => i.packed).length;
            return (
              <div key={cat.id} className="bg-white rounded-[24px] overflow-hidden border border-surface-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                
                <div className="p-6 flex items-center justify-between cursor-pointer" onClick={() => setExpanded(e => ({...e, [cat.id]: !e[cat.id]}))}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-xl">
                      {cat.icon}
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-surface-900">{cat.name}</h2>
                      <p className="text-surface-500 text-sm">{cat.subtitle ? `${cat.subtitle} (${packedCount}/${cat.total})` : `Documents & Money (${packedCount}/${cat.total})`}</p>
                    </div>
                  </div>
                  {expanded[cat.id] ? <ChevronUp className="text-surface-400" /> : <ChevronDown className="text-surface-400" />}
                </div>

                <AnimatePresence>
                  {expanded[cat.id] && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="px-6 pb-6 space-y-4">
                        {cat.items.map(item => (
                          <div key={item.id} className="flex items-center justify-between group cursor-pointer" onClick={() => toggleItem(cat.id, item.id)}>
                            <div className="flex items-center gap-4">
                              <div className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                                item.packed ? 'bg-[#4f46e5] border-[#4f46e5]' : 'bg-white border-2 border-surface-200'
                              }`}>
                                {item.packed && <Check size={14} className="text-white stroke-[3]" />}
                              </div>
                              <span className={`text-[15px] font-medium transition-colors ${item.packed ? 'text-surface-400 line-through' : 'text-surface-700'}`}>
                                {item.name}
                              </span>
                            </div>
                            {item.badge && (
                              <span className="px-2.5 py-1 rounded bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-wider">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <button className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-[#4f46e5] hover:bg-[#4338ca] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(79,70,229,0.4)] hover:scale-105 transition-all z-50">
        <Plus size={28} />
      </button>
    </div>
  );
};

export default PackingChecklist;
