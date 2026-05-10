import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Save, Plus, GripVertical, MapPin, 
  Clock, DollarSign, Calendar, ChevronDown, ChevronRight,
  ArrowLeft
} from 'lucide-react';

// Mock data
const initialStops = [
  {
    id: 'stop1',
    city: 'Paris, France',
    startDate: '2026-06-15',
    endDate: '2026-06-18',
    isExpanded: true,
    activities: [
      { id: 'act1', name: 'Eiffel Tower Tour', type: 'Sightseeing', time: '10:00 AM', duration: '2h', cost: 25 },
      { id: 'act2', name: 'Louvre Museum', type: 'Art', time: '02:00 PM', duration: '3h', cost: 17 },
      { id: 'act3', name: 'Seine River Cruise', type: 'Activity', time: '07:30 PM', duration: '1.5h', cost: 30 },
    ]
  },
  {
    id: 'stop2',
    city: 'Lyon, France',
    startDate: '2026-06-18',
    endDate: '2026-06-21',
    isExpanded: false,
    activities: [
      { id: 'act4', name: 'Bouchon Dinner', type: 'Food', time: '08:00 PM', duration: '2h', cost: 50 },
    ]
  }
];

const categoryColors = {
  Sightseeing: 'bg-blue-500 border-blue-600',
  Art: 'bg-purple-500 border-purple-600',
  Food: 'bg-orange-500 border-orange-600',
  Activity: 'bg-emerald-500 border-emerald-600',
  Transit: 'bg-surface-500 border-surface-600',
};

const ItineraryBuilder = () => {
  const { tripId } = useParams();
  const [stops, setStops] = useState(initialStops);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 800);
  };

  const toggleStop = (id) => {
    setStops(stops.map(stop => stop.id === id ? { ...stop, isExpanded: !stop.isExpanded } : stop));
  };

  // Simplified Drag and Drop simulation for UI demonstration
  // In a real app, you would use dnd-kit or react-beautiful-dnd
  const handleDragStart = (e, actId) => {
    e.dataTransfer.setData('text/plain', actId);
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('opacity-50');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-surface-50 font-sans overflow-hidden">
      
      {/* Top Bar */}
      <div className="bg-white border-b border-surface-200 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <Link to="/trips" className="p-2 bg-surface-100 rounded-xl hover:bg-surface-200 text-surface-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-extrabold text-surface-900">Summer in Paris</h1>
            <p className="text-xs font-semibold text-surface-500 uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
              <Calendar size={12} /> June 15 - June 25, 2026 (10 Days)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-bold text-surface-600 hover:bg-surface-100 rounded-xl transition-colors">
            Settings
          </button>
          <Link to={`/itinerary/${tripId || '1'}`} className="px-4 py-2 text-sm font-bold text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-xl transition-colors">
            Preview
          </Link>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Panel: Stops & Activities List */}
        <div className="w-1/3 bg-white border-r border-surface-200 overflow-y-auto hidden md:block">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-surface-900">Itinerary Stops</h2>
              <button className="p-1.5 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors">
                <Plus size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {stops.map((stop) => (
                <div key={stop.id} className="border border-surface-200 rounded-2xl overflow-hidden bg-surface-50/50">
                  <div 
                    className="p-4 bg-white border-b border-surface-200 cursor-pointer hover:bg-surface-50 transition-colors flex items-center justify-between"
                    onClick={() => toggleStop(stop.id)}
                  >
                    <div>
                      <h3 className="font-bold text-surface-900 text-sm flex items-center gap-1.5">
                        <MapPin size={14} className="text-primary-500" /> {stop.city}
                      </h3>
                      <p className="text-xs text-surface-500 mt-1 pl-5 font-medium">{stop.startDate} - {stop.endDate}</p>
                    </div>
                    {stop.isExpanded ? <ChevronDown size={18} className="text-surface-400" /> : <ChevronRight size={18} className="text-surface-400" />}
                  </div>

                  <AnimatePresence>
                    {stop.isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-3 space-y-2">
                          {stop.activities.map((act) => (
                            <div 
                              key={act.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, act.id)}
                              onDragEnd={handleDragEnd}
                              className="bg-white border border-surface-200 p-3 rounded-xl flex items-center gap-3 cursor-grab hover:border-primary-300 hover:shadow-sm transition-all"
                            >
                              <GripVertical size={16} className="text-surface-300 cursor-grab" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-surface-900 truncate">{act.name}</p>
                                <div className="flex items-center gap-3 mt-1 text-xs text-surface-500 font-medium">
                                  <span className="flex items-center gap-1"><Clock size={12} /> {act.time}</span>
                                  <span className="flex items-center gap-1"><DollarSign size={12} /> {act.cost}</span>
                                </div>
                              </div>
                              <div className={`w-2 h-2 rounded-full ${categoryColors[act.type]?.split(' ')[0]}`} />
                            </div>
                          ))}
                          <button className="w-full py-2.5 mt-2 border-2 border-dashed border-surface-200 rounded-xl text-xs font-bold text-surface-500 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-colors flex items-center justify-center gap-1.5">
                            <Plus size={14} /> Add Activity
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Visual Timeline Canvas */}
        <div className="flex-1 bg-surface-100 overflow-y-auto relative p-6 lg:p-10" onDragOver={handleDragOver}>
          <div className="max-w-4xl mx-auto">
            
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-surface-900">Visual Timeline</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-surface-500 uppercase tracking-widest">Day 1 - June 15</span>
              </div>
            </div>

            {/* Timeline Grid */}
            <div className="relative bg-white rounded-3xl shadow-sm border border-surface-200 p-6 min-h-[600px]">
              {/* Background grid lines */}
              <div className="absolute top-6 bottom-6 left-20 right-6 flex flex-col justify-between">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="border-t border-surface-100 w-full" />
                ))}
              </div>

              {/* Time Labels & Blocks */}
              <div className="relative h-full flex">
                {/* Y-Axis Time Labels */}
                <div className="w-16 flex flex-col justify-between h-full py-0 text-xs font-bold text-surface-400 shrink-0 relative z-10">
                  <span>08:00 AM</span>
                  <span>10:00 AM</span>
                  <span>12:00 PM</span>
                  <span>02:00 PM</span>
                  <span>04:00 PM</span>
                  <span>06:00 PM</span>
                  <span>08:00 PM</span>
                  <span>10:00 PM</span>
                </div>

                {/* Blocks Area */}
                <div className="flex-1 relative z-10">
                  {/* Eiffel Tower block (10:00 AM - 12:00 PM) */}
                  <motion.div 
                    layoutId="act1"
                    className="absolute top-[14.28%] left-4 right-4 h-[14.28%] bg-blue-500 border border-blue-600 rounded-xl p-3 text-white shadow-md cursor-pointer hover:brightness-110 transition-all flex flex-col justify-center"
                  >
                    <p className="font-bold text-sm">Eiffel Tower Tour</p>
                    <p className="text-xs text-blue-100 font-medium">10:00 AM - 12:00 PM • Sightseeing</p>
                  </motion.div>

                  {/* Lunch block */}
                  <div className="absolute top-[32%] left-4 right-4 h-[7%] border-2 border-dashed border-surface-200 rounded-xl flex items-center justify-center text-xs font-bold text-surface-400">
                    Free Time / Lunch
                  </div>

                  {/* Louvre block (02:00 PM - 05:00 PM) */}
                  <motion.div 
                    layoutId="act2"
                    className="absolute top-[42.85%] left-4 right-4 h-[21.42%] bg-purple-500 border border-purple-600 rounded-xl p-3 text-white shadow-md cursor-pointer hover:brightness-110 transition-all flex flex-col justify-center"
                  >
                    <p className="font-bold text-sm">Louvre Museum</p>
                    <p className="text-xs text-purple-100 font-medium">02:00 PM - 05:00 PM • Art</p>
                  </motion.div>

                  {/* Dinner Cruise block (07:30 PM - 09:00 PM) */}
                  <motion.div 
                    layoutId="act3"
                    className="absolute top-[82.14%] left-4 right-4 h-[10.71%] bg-orange-500 border border-orange-600 rounded-xl p-3 text-white shadow-md cursor-pointer hover:brightness-110 transition-all flex flex-col justify-center"
                  >
                    <p className="font-bold text-sm">Seine River Cruise & Dinner</p>
                    <p className="text-xs text-orange-100 font-medium">07:30 PM - 09:00 PM • Activity & Food</p>
                  </motion.div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Floating Save Button */}
      <button 
        onClick={handleSave}
        className="absolute bottom-8 right-8 px-6 py-3.5 bg-surface-900 text-white rounded-2xl shadow-xl shadow-surface-900/20 hover:bg-surface-800 transition-all font-bold flex items-center gap-2 z-50"
      >
        {saving ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...
          </>
        ) : (
          <>
            <Save size={18} /> Save Changes
          </>
        )}
      </button>

    </div>
  );
};

export default ItineraryBuilder;
