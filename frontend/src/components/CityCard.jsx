import { FiMapPin, FiArrowRight } from 'react-icons/fi';

const cityImages = [
  'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80', // NY
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80', // London
  'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80', // Paris
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80', // Tokyo
  'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80', // Dubai
];

const CityCard = ({ city, onClick }) => {
  const bgImage = cityImages[Math.abs((city.name || '').length) % cityImages.length];

  return (
    <div
      onClick={() => onClick?.(city)}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm border border-surface-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
    >
      <div className="h-48 relative overflow-hidden bg-surface-200">
        <img 
          src={bgImage} 
          alt={city.name} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        
        {/* Persistent Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900/90 via-surface-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        <div className="absolute inset-0 p-5 flex flex-col justify-end">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white font-extrabold text-2xl drop-shadow-md">{city.name}</h3>
            {city.country && (
              <p className="text-white/80 text-sm font-medium flex items-center gap-1.5 mt-1">
                <FiMapPin /> {city.country}
              </p>
            )}
            
            {/* Hover Reveal CTA */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-3 pt-3 border-t border-white/20">
              <span className="flex items-center gap-2 text-white text-sm font-bold">
                Explore Destination <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>

        {/* Top Badge */}
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30 shadow-lg">
          Popular
        </div>
      </div>
      
      {city.description && (
        <div className="p-4 bg-white">
          <p className="text-sm text-surface-500 line-clamp-2 leading-relaxed">{city.description}</p>
        </div>
      )}
    </div>
  );
};

export default CityCard;
