const ChecklistItem = ({ item, onToggle, onDelete }) => {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 group ${
      item.completed ? 'bg-emerald-50/50 border-emerald-200' : 'bg-white border-surface-100 hover:border-surface-200'
    }`}>
      <button
        onClick={() => onToggle?.(item)}
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0 cursor-pointer ${
          item.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-surface-300 hover:border-primary-400'
        }`}
      >
        {item.completed && (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
      <span className={`flex-1 text-sm ${item.completed ? 'line-through text-surface-400' : 'text-surface-700'}`}>
        {item.text || item.name}
      </span>
      {onDelete && (
        <button onClick={() => onDelete(item)} className="opacity-0 group-hover:opacity-100 text-surface-400 hover:text-red-500 transition-all cursor-pointer">
          ✕
        </button>
      )}
    </div>
  );
};

export default ChecklistItem;
