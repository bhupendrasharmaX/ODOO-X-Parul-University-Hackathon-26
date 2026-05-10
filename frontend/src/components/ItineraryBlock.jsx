const ItineraryBlock = ({ day, stops = [], onAddStop }) => {
  return (
    <div className="bg-white rounded-2xl border border-surface-100 overflow-hidden">
      <div className="px-5 py-3 bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-between">
        <h3 className="text-white font-bold text-sm">Day {day.dayNumber || day.day}</h3>
        <span className="text-white/70 text-xs">{day.date || ''}</span>
      </div>
      <div className="p-4 space-y-3">
        {stops.length === 0 ? (
          <p className="text-sm text-surface-400 text-center py-4">No stops added yet</p>
        ) : (
          <div className="relative pl-6">
            <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-primary-200" />
            {stops.map((stop, i) => (
              <div key={i} className="relative mb-4 last:mb-0">
                <div className="absolute -left-4 top-1.5 w-3 h-3 rounded-full bg-primary-500 border-2 border-white shadow" />
                <div className="bg-surface-50 rounded-lg p-3">
                  <p className="font-medium text-sm text-surface-900">{stop.name || stop.location}</p>
                  {stop.time && <p className="text-xs text-surface-500 mt-0.5">🕐 {stop.time}</p>}
                  {stop.notes && <p className="text-xs text-surface-400 mt-1">{stop.notes}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
        {onAddStop && (
          <button
            onClick={() => onAddStop(day)}
            className="w-full py-2 text-xs font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors cursor-pointer"
          >
            + Add Stop
          </button>
        )}
      </div>
    </div>
  );
};

export default ItineraryBlock;
