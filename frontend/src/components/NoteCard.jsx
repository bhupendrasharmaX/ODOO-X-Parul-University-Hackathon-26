import { FiEdit2, FiTrash2, FiClock } from 'react-icons/fi';
import { formatDate } from '../utils/helpers';

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-3xl border border-surface-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary-400 to-accent-400 opacity-50 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-start justify-between mb-4">
        <h4 className="font-bold text-surface-900 text-lg leading-tight group-hover:text-primary-600 transition-colors">
          {note.title || 'Untitled Note'}
        </h4>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm rounded-lg p-1">
          {onEdit && (
            <button 
              onClick={() => onEdit(note)} 
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-primary-50 text-surface-400 hover:text-primary-600 transition-colors cursor-pointer"
            >
              <FiEdit2 className="text-sm" />
            </button>
          )}
          {onDelete && (
            <button 
              onClick={() => onDelete(note)} 
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-surface-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              <FiTrash2 className="text-sm" />
            </button>
          )}
        </div>
      </div>
      
      <p className="text-sm text-surface-600 font-medium whitespace-pre-wrap leading-relaxed flex-1">
        {note.content}
      </p>
      
      {note.createdAt && (
        <div className="mt-6 pt-4 border-t border-surface-100 flex items-center gap-2 text-xs font-bold text-surface-400 uppercase tracking-wider">
          <FiClock className="text-sm" />
          {formatDate(note.createdAt)}
        </div>
      )}
    </div>
  );
};

export default NoteCard;
