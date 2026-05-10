import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, Copy, Edit2, Calendar, MapPin, 
  List, GitCommit, Clock, DollarSign, 
  ArrowLeft, CheckCircle2
} from 'lucide-react';

// Mock Trip Data
const tripData = {
  id: '1',
  name: 'Summer in Paris & Lyon',
  creator: 'Jane Doe',
  destination: 'France',
  startDate: '2026-06-15',
  endDate: '2026-06-25',
  image: 'https://images.unsplash.com/photo-1502602898657-3e90760b2697?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  stops: [
    {
      id: 'stop1',
      city: 'Paris',
      dateStr: 'June 15 - June 18',
      days: [
        {
          day: 'Day 1 - June 15',
          activities: [
            { id: 'a1', name: 'Check-in at Hotel', type: 'Transit', time: '02:00 PM', duration: '1h', cost: 0 },
            { id: 'a2', name: 'Eiffel Tower Sunset', type: 'Sightseeing', time: '07:30 PM', duration: '3h', cost: 35 },
          ]
        },
        {
          day: 'Day 2 - June 16',
          activities: [
            { id: 'a3', name: 'Louvre Museum', type: 'Art', time: '10:00 AM', duration: '4h', cost: 17 },
            { id: 'a4', name: 'Cafe de Flore Lunch', type: 'Food', time: '02:30 PM', duration: '1.5h', cost: 45 },
          ]
        }
      ]
    },
    {
      id: 'stop2',
      city: 'Lyon',
      dateStr: 'June 18 - June 21',
      days: [
        {
          day: 'Day 4 - June 18',
          activities: [
            { id: 'a5', name: 'TGV Train to Lyon', type: 'Transit', time: '09:00 AM', duration: '2h', cost: 80 },
            { id: 'a6', name: 'Vieux Lyon Walking Tour', type: 'Sightseeing', time: '03:00 PM', duration: '2.5h', cost: 0 },
            { id: 'a7', name: 'Bouchon Dinner', type: 'Food', time: '08:00 PM', duration: '2h', cost: 60 },
          ]
        }
      ]
    }
  ]
};

const categoryStyles = {
  Sightseeing: 'bg-blue-100 text-blue-700',
  Art: 'bg-purple-100 text-purple-700',
  Food: 'bg-orange-100 text-orange-700',
  Activity: 'bg-emerald-100 text-emerald-700',
  Transit: 'bg-surface-200 text-surface-700',
};

const ItineraryView = ({ isShared = false }) => {
  const { tripId } = useParams();
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' | 'list'
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pb-20 font-sans bg-surface-50 min-h-[calc(100vh-80px)]">
      
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] w-full">
        <img src={tripData.image} alt={tripData.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-900/50 to-surface-900/20" />
        
        {/* Top Navigation Overlay */}
        {!isShared && (
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
            <Link to="/trips" className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex gap-3">
              <Link to={`/itinerary/build/${tripId}`} className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur text-white font-bold text-sm hover:bg-white/30 transition-colors flex items-center gap-2">
                <Edit2 size={16} /> Edit
              </Link>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-5xl mx-auto z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            {isShared && (
              <p className="text-white/80 font-bold text-sm mb-2 uppercase tracking-widest flex items-center gap-2">
                <img src={`https://ui-avatars.com/api/?name=${tripData.creator}&background=random`} alt="creator" className="w-6 h-6 rounded-full" />
                Curated by {tripData.creator}
              </p>
            )}
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">{tripData.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm font-semibold">
              <span className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur"><MapPin size={16} /> {tripData.destination}</span>
              <span className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur"><Calendar size={16} /> {tripData.startDate} - {tripData.endDate}</span>
            </div>
          </div>

          <div className="flex gap-3 shrink-0">
            <button onClick={handleCopy} className="w-12 h-12 rounded-xl bg-white text-surface-900 flex items-center justify-center hover:bg-surface-100 transition-colors shadow-lg">
              {copied ? <CheckCircle2 size={20} className="text-emerald-500" /> : <Copy size={20} />}
            </button>
            <button className="px-6 py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/30 flex items-center gap-2">
              <Share2 size={18} /> Share Trip
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 mt-10">
        
        {/* View Toggle */}
        <div className="flex items-center justify-center mb-10">
          <div className="bg-surface-200/50 p-1 rounded-xl flex shadow-sm">
            <button 
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${viewMode === 'timeline' ? 'bg-white text-primary-600 shadow-sm' : 'text-surface-500 hover:text-surface-900'}`}
            >
              <GitCommit size={18} /> Timeline
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${viewMode === 'list' ? 'bg-white text-primary-600 shadow-sm' : 'text-surface-500 hover:text-surface-900'}`}
            >
              <List size={18} /> List View
            </button>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {viewMode === 'timeline' ? (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12 pl-4 sm:pl-8 border-l-2 border-surface-200 ml-4 sm:ml-8 relative"
            >
              {tripData.stops.map((stop) => (
                <div key={stop.id} className="relative">
                  {/* Stop Node */}
                  <div className="absolute -left-[43px] sm:-left-[59px] top-0 w-6 h-6 rounded-full bg-primary-100 border-4 border-white flex items-center justify-center shadow-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />
                  </div>
                  
                  {/* Stop Header */}
                  <div className="mb-6 -mt-1.5">
                    <h2 className="text-2xl font-extrabold text-surface-900">{stop.city}</h2>
                    <p className="text-sm font-semibold text-surface-500 uppercase tracking-widest mt-1">{stop.dateStr}</p>
                  </div>

                  {/* Days & Activities */}
                  <div className="space-y-8">
                    {stop.days.map((day, idx) => (
                      <div key={idx} className="bg-white rounded-3xl p-6 md:p-8 shadow-soft border border-surface-100">
                        <h3 className="text-lg font-bold text-surface-900 mb-6 pb-4 border-b border-surface-100 flex items-center gap-2">
                          <Calendar size={18} className="text-primary-500" /> {day.day}
                        </h3>
                        
                        <div className="space-y-6">
                          {day.activities.map((act) => (
                            <div key={act.id} className="flex gap-4">
                              <div className="w-16 shrink-0 text-right pt-1">
                                <span className="text-sm font-bold text-surface-900">{act.time.split(' ')[0]}</span>
                                <span className="text-xs font-semibold text-surface-400 block">{act.time.split(' ')[1]}</span>
                              </div>
                              <div className="w-2 rounded-full bg-surface-100 shrink-0" />
                              <div className="flex-1 pb-6 border-b border-surface-100 last:border-0 last:pb-0">
                                <div className="flex flex-wrap items-start justify-between gap-2">
                                  <div>
                                    <h4 className="text-base font-bold text-surface-900">{act.name}</h4>
                                    <div className="flex items-center gap-4 mt-2">
                                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${categoryStyles[act.type] || categoryStyles.Transit}`}>
                                        {act.type}
                                      </span>
                                      <span className="text-xs font-semibold text-surface-500 flex items-center gap-1"><Clock size={12}/> {act.duration}</span>
                                    </div>
                                  </div>
                                  <span className="text-sm font-bold text-surface-700 bg-surface-100 px-3 py-1 rounded-lg flex items-center gap-1">
                                    <DollarSign size={14} className="text-surface-400" /> {act.cost}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              {tripData.stops.map((stop) => (
                <div key={stop.id}>
                  <h2 className="text-2xl font-extrabold text-surface-900 mb-4 flex items-center gap-2">
                    <MapPin className="text-primary-500" /> {stop.city}
                  </h2>
                  <div className="bg-white rounded-3xl shadow-soft border border-surface-100 overflow-hidden">
                    {stop.days.map((day, idx) => (
                      <div key={idx}>
                        <div className="bg-surface-50 px-6 py-3 border-y border-surface-100 first:border-t-0 font-bold text-sm text-surface-600 uppercase tracking-wider">
                          {day.day}
                        </div>
                        <div className="divide-y divide-surface-100">
                          {day.activities.map((act) => (
                            <div key={act.id} className="flex items-center justify-between p-6 hover:bg-surface-50/50 transition-colors">
                              <div className="flex items-center gap-4">
                                <div className="w-16 shrink-0">
                                  <span className="text-sm font-bold text-surface-900 block">{act.time}</span>
                                </div>
                                <div>
                                  <h4 className="text-base font-bold text-surface-900">{act.name}</h4>
                                  <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded ${categoryStyles[act.type] || categoryStyles.Transit}`}>
                                    {act.type}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-6 text-sm font-semibold">
                                <span className="text-surface-500 flex items-center gap-1"><Clock size={14}/> {act.duration}</span>
                                <span className="text-surface-900 w-12 text-right">${act.cost}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default ItineraryView;
