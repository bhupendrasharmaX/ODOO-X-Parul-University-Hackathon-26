import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Copy, Check, MessageCircle, Share2, MapPin, Calendar, Clock, DollarSign, Plus } from 'lucide-react';

const mockTrip = {
  name: 'Summer in Paris',
  destination: 'Paris, France',
  heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1400&q=85',
  startDate: '2026-06-15',
  endDate: '2026-06-25',
  creator: { name: 'Alice Johnson', avatar: 'A' },
  stops: [
    {
      city: 'Paris, France',
      activities: [
        { name: 'Eiffel Tower Summit Tour', type: 'Sightseeing', time: '10:00 AM', duration: '2h', cost: 45, color: '#4f46e5' },
        { name: 'Louvre Museum Private Tour', type: 'Art', time: '02:00 PM', duration: '3h', cost: 60, color: '#8b5cf6' },
        { name: 'Seine River Dinner Cruise', type: 'Food', time: '07:30 PM', duration: '2h', cost: 85, color: '#f59e0b' },
      ]
    },
    {
      city: 'Versailles, France',
      activities: [
        { name: 'Palace of Versailles Tour', type: 'Heritage', time: '09:00 AM', duration: '4h', cost: 35, color: '#10b981' },
        { name: 'Versailles Gardens Walk', type: 'Sightseeing', time: '01:30 PM', duration: '2h', cost: 0, color: '#4f46e5' },
      ]
    }
  ]
};

const SharedItinerary = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareButtons = [
    {
      label: 'WhatsApp', icon: <MessageCircle size={20} />,
      bg: '#25D366', action: () => window.open(`https://wa.me/?text=${encodeURIComponent('Check out this trip: ' + window.location.href)}`)
    },
    {
      label: 'Twitter/X', icon: <Share2 size={20} />,
      bg: '#1DA1F2', action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out my Elite Travel trip: ' + window.location.href)}`)
    },
  ];

  const nights = Math.round((new Date(mockTrip.endDate) - new Date(mockTrip.startDate)) / 86400000);

  return (
    <div className="bg-surface-50 min-h-screen font-sans flex flex-col">
      {/* Full-width hero */}
      <div className="relative h-[480px] w-full overflow-hidden">
        <img src={mockTrip.heroImage} alt={mockTrip.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.3) 60%, transparent 100%)' }} />

        {/* Logo top-left */}
        <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold font-display text-lg shadow-lg"
            style={{ background: 'linear-gradient(135deg, #4f46e5, #818cf8)' }}>T</div>
          <span className="font-display text-xl font-semibold text-white">Elite Travel</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-white/60 text-sm font-medium uppercase tracking-widest mb-2">Shared Itinerary</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
              {mockTrip.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm font-semibold">
              <span className="flex items-center gap-1.5"><MapPin size={16} />{mockTrip.destination}</span>
              <span className="flex items-center gap-1.5"><Calendar size={16} />
                {new Date(mockTrip.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} — {new Date(mockTrip.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-bold">{nights} nights</span>
            </div>
          </div>
        </div>
      </div>

      {/* Creator + Actions */}
      <div className="max-w-4xl mx-auto w-full px-4 md:px-8 py-8">
        <div className="bg-white rounded-[20px] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8"
          style={{ boxShadow: 'var(--shadow-card)', marginTop: '-48px', position: 'relative', zIndex: 10 }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #f59e0b)' }}>
              {mockTrip.creator.avatar}
            </div>
            <div>
              <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-0.5">Shared by</p>
              <p className="font-bold text-surface-900">{mockTrip.creator.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {shareButtons.map(btn => (
              <button key={btn.label} onClick={btn.action}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 hover:shadow-lg"
                style={{ backgroundColor: btn.bg }} title={btn.label}>
                {btn.icon}
              </button>
            ))}
            <button onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all"
              style={copied
                ? { background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }
                : { background: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569' }}>
              {copied ? <><Check size={16} /> Copied!</> : <><Copy size={16} /> Copy Link</>}
            </button>
            <Link to="/create-trip" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #4338ca)', boxShadow: '0 4px 14px rgba(79,70,229,0.4)' }}>
              <Plus size={18} /> Copy This Trip
            </Link>
          </div>
        </div>

        {/* Itinerary Timeline */}
        <div className="space-y-8">
          {mockTrip.stops.map((stop, si) => (
            <motion.div key={stop.city} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.15 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center shadow-md">
                  {si + 1}
                </div>
                <h2 className="font-display text-2xl font-semibold text-surface-900">{stop.city}</h2>
              </div>

              <div className="ml-11 space-y-3">
                {stop.activities.map((act, ai) => (
                  <motion.div key={act.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: si * 0.15 + ai * 0.08 }}
                    className="bg-white rounded-[16px] p-5 flex items-start gap-4 hover:shadow-md transition-shadow"
                    style={{ boxShadow: 'var(--shadow-card)', borderLeft: `4px solid ${act.color}` }}>
                    <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: act.color }} />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-surface-900 mb-1">{act.name}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-surface-500">
                        <span className="flex items-center gap-1"><Clock size={12} />{act.time}</span>
                        <span className="flex items-center gap-1"><Clock size={12} />{act.duration}</span>
                        {act.cost > 0 && <span className="flex items-center gap-1 text-emerald-600 font-bold"><DollarSign size={12} />{act.cost}</span>}
                        {act.cost === 0 && <span className="text-emerald-600 font-bold">Free</span>}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap"
                      style={{ backgroundColor: `${act.color}15`, color: act.color }}>
                      {act.type}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 bg-surface-950 text-surface-400 py-14 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold font-display"
            style={{ background: 'linear-gradient(135deg, #4f46e5, #818cf8)' }}>T</div>
          <span className="font-display text-2xl font-semibold text-white">Elite Travel</span>
        </div>
        <p className="text-sm font-medium mb-6 max-w-md mx-auto">
          Start planning your own adventures and share them with the world. Join Elite Travel today for free.
        </p>
        <Link to="/login" className="px-8 py-3.5 text-sm font-bold rounded-xl inline-flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg, #4f46e5, #4338ca)', color: 'white', boxShadow: '0 4px 14px rgba(79,70,229,0.4)' }}>
          <Plus size={18} /> Create Your Free Trip
        </Link>
        <p className="mt-10 text-xs text-surface-600">© {new Date().getFullYear()} Elite Travel Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SharedItinerary;
