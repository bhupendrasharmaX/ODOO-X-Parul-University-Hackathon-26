import { Link } from 'react-router-dom';
import { formatDate, calculateTripDays, formatCurrency } from '../utils/helpers';
import { FiCalendar, FiArrowRight, FiDollarSign, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';

const unsplashImages = [
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
  'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?w=800&q=80',
  'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80',
  'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&q=80',
];

const TripCard = ({ trip, onEdit, onDelete }) => {
  const days = calculateTripDays(trip.startDate, trip.endDate);
  const tripId = trip._id || trip.id;

  const bgImage = unsplashImages[Math.abs((trip.destination || '').length) % unsplashImages.length];

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-surface-100 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
      {/* Header Image */}
      <div className="h-40 relative overflow-hidden bg-surface-200">
        <img 
          src={bgImage} 
          alt={trip.destination} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900/90 via-surface-900/40 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-white font-extrabold text-xl truncate tracking-tight drop-shadow-md">
            {trip.destination || 'Untitled Trip'}
          </h3>
          <p className="text-white/90 text-sm font-medium mt-0.5">{days} {days === 1 ? 'day' : 'days'}</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between text-sm bg-surface-50 p-3 rounded-xl border border-surface-100">
          <div className="flex items-center gap-2 text-surface-600 font-medium">
            <FiCalendar className="text-primary-500 text-lg" />
            {formatDate(trip.startDate)}
          </div>
          <FiArrowRight className="text-surface-400" />
          <div className="text-surface-600 font-medium">{formatDate(trip.endDate)}</div>
        </div>

        <div className="flex items-center justify-between">
          {trip.budget ? (
            <div className="flex items-center gap-1.5 text-sm text-surface-700 font-semibold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100">
              <FiDollarSign className="text-lg" />
              {formatCurrency(trip.budget)}
            </div>
          ) : (
            <div className="text-sm text-surface-400">No budget set</div>
          )}
        </div>

        {trip.notes && (
          <p className="text-sm text-surface-500 line-clamp-2 leading-relaxed mt-1">
            {trip.notes}
          </p>
        )}

        <div className="flex-1" /> {/* Spacer */}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-4 border-t border-surface-100 mt-2">
          <Link
            to={`/itinerary/${tripId}`}
            className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white transition-colors"
          >
            <FiEye className="text-lg" /> View
          </Link>
          {onEdit && (
            <button
              onClick={() => onEdit(trip)}
              className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl bg-surface-50 text-surface-600 hover:bg-surface-200 hover:text-surface-900 transition-colors cursor-pointer"
            >
              <FiEdit2 className="text-lg" /> Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(tripId)}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
              title="Delete Trip"
            >
              <FiTrash2 className="text-lg" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripCard;
