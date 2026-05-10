import { FiClock, FiPlus } from 'react-icons/fi';

const activityImages = [
  'https://images.unsplash.com/photo-1542314831-c6a4d14b8fcb?w=800&q=80', // Surfing
  'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80', // Museum
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80', // Dining
  'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80', // Hiking
  'https://images.unsplash.com/photo-1571210862729-78a52d3779a2?w=800&q=80', // Spa
];

const ActivityCard = ({ activity, onAdd, showAdd = false }) => {
  const bgImage = activityImages[Math.abs((activity.name || '').length) % activityImages.length];

  return (
    <div className="group bg-white rounded-2xl border border-surface-100 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
      <div className="flex flex-col sm:flex-row h-full">
        {/* Left Image Section */}
        <div className="w-full sm:w-40 h-48 sm:h-auto relative overflow-hidden shrink-0 bg-surface-200">
          <img 
            src={bgImage} 
            alt={activity.name} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
          
          {/* Category Badge Floating on Image */}
          {activity.category && (
            <div className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-white/90 text-surface-900 shadow-sm backdrop-blur-sm">
              {activity.category}
            </div>
          )}
        </div>

        {/* Right Content Section */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3">
              <h4 className="font-bold text-surface-900 text-lg leading-tight group-hover:text-primary-600 transition-colors">
                {activity.name || 'Activity'}
              </h4>
              <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center text-xl shrink-0">
                {activity.icon || '🎯'}
              </div>
            </div>
            
            {activity.description && (
              <p className="text-sm text-surface-500 mt-2.5 line-clamp-2 leading-relaxed">
                {activity.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-100">
            {activity.duration ? (
              <p className="text-sm font-medium text-surface-600 flex items-center gap-1.5 bg-surface-50 px-2.5 py-1 rounded-lg">
                <FiClock className="text-surface-400" />
                {activity.duration}
              </p>
            ) : <div />}

            {showAdd && onAdd && (
              <button
                onClick={() => onAdd(activity)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 active:scale-95 transition-all shadow-sm shadow-primary-500/20 cursor-pointer"
              >
                <FiPlus /> Add to Trip
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
