const StopCard = ({ stop, index, onRemove }) => {
  return (
    <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-surface-100 hover:shadow-sm transition-all group">
      <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold shrink-0">
        {index + 1}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm text-surface-900 truncate">{stop.name || stop.location}</h4>
        {stop.time && <p className="text-xs text-surface-500 mt-0.5">🕐 {stop.time}</p>}
        {stop.activity && <p className="text-xs text-primary-600 mt-0.5">🎯 {stop.activity}</p>}
        {stop.notes && <p className="text-xs text-surface-400 mt-1">{stop.notes}</p>}
      </div>
      {onRemove && (
        <button
          onClick={() => onRemove(index)}
          className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all cursor-pointer text-sm"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default StopCard;
