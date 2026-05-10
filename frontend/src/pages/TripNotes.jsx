import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Plus, Trash2, Edit3, Save, 
  Bold, Italic, List as ListIcon, Calendar, BookOpen
} from 'lucide-react';

const mockTrips = [
  { id: '1', name: 'Summer in Paris' },
  { id: '2', name: 'Tokyo Adventure' },
  { id: '3', name: 'Bali Retreat' }
];

const mockNotes = [
  { id: 'n1', title: 'Arrival details & hotel check-in', date: '2026-06-15T14:30:00', content: 'Flight lands at CDG at 10 AM. Take the RER B train to Gare du Nord. Check-in is at 3 PM, so we will drop bags early and grab lunch at Cafe de Flore.' },
  { id: 'n2', title: 'Museum passes and bookings', date: '2026-06-16T09:15:00', content: 'Do NOT forget the printed Louvre tickets. Also need to book the Seine river cruise for Thursday night before they sell out.' },
  { id: 'n3', title: 'Packing reminders', date: '2026-06-10T18:45:00', content: 'Bring comfortable walking shoes, umbrella (forecast shows rain on Tuesday), and the universal power adapter.' },
];

const TripNotes = () => {
  const { tripId } = useParams();
  const [selectedTrip, setSelectedTrip] = useState(tripId || '1');
  const [notes, setNotes] = useState(mockNotes.sort((a, b) => new Date(b.date) - new Date(a.date)));
  const [activeNote, setActiveNote] = useState(notes[0] || null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ title: '', content: '' });

  const handleSelectNote = (note) => {
    setActiveNote(note);
    setIsEditing(false);
  };

  const handleCreateNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: 'New Note',
      date: new Date().toISOString(),
      content: ''
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
    setEditForm({ title: newNote.title, content: newNote.content });
    setIsEditing(true);
  };

  const handleEditNote = () => {
    if (!activeNote) return;
    setEditForm({ title: activeNote.title, content: activeNote.content });
    setIsEditing(true);
  };

  const handleSaveNote = () => {
    const updatedNotes = notes.map(n => 
      n.id === activeNote.id 
        ? { ...n, title: editForm.title || 'Untitled Note', content: editForm.content, date: new Date().toISOString() } 
        : n
    ).sort((a, b) => new Date(b.date) - new Date(a.date));
    
    setNotes(updatedNotes);
    setActiveNote(updatedNotes.find(n => n.id === activeNote.id));
    setIsEditing(false);
  };

  const handleDeleteNote = (e, id) => {
    e.stopPropagation();
    const updatedNotes = notes.filter(n => n.id !== id);
    setNotes(updatedNotes);
    if (activeNote?.id === id) {
      setActiveNote(updatedNotes[0] || null);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-surface-50 font-sans">
      
      {/* Top Bar */}
      <div className="bg-white border-b border-surface-200 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <Link to={`/itinerary/${selectedTrip}`} className="p-2 bg-surface-100 rounded-xl hover:bg-surface-200 text-surface-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-3 border-l border-surface-200 pl-4 ml-2">
            <select 
              value={selectedTrip}
              onChange={(e) => setSelectedTrip(e.target.value)}
              className="bg-transparent font-extrabold text-surface-900 text-lg outline-none cursor-pointer hover:text-primary-600 transition-colors"
            >
              {mockTrips.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {notes.length === 0 ? (
        /* Empty State */
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white m-6 rounded-3xl border border-surface-200 shadow-sm">
          <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mb-6">
            <BookOpen size={48} className="text-primary-400" />
          </div>
          <h2 className="text-2xl font-bold text-surface-900 mb-2">No notes yet</h2>
          <p className="text-surface-500 max-w-sm mb-8">
            Keep track of reservations, packing lists, and journal entries all in one place.
          </p>
          <button 
            onClick={handleCreateNote}
            className="px-6 py-3 bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-colors flex items-center gap-2"
          >
            <Plus size={20} /> Create Your First Note
          </button>
        </div>
      ) : (
        /* 2-Panel Layout */
        <div className="flex flex-1 overflow-hidden m-6 bg-white rounded-3xl border border-surface-200 shadow-soft">
          
          {/* Left Panel: Notes List */}
          <div className="w-1/3 min-w-[300px] border-r border-surface-200 flex flex-col bg-surface-50">
            <div className="p-4 border-b border-surface-200 flex justify-between items-center bg-white">
              <h2 className="font-extrabold text-surface-900">Journal</h2>
              <button 
                onClick={handleCreateNote}
                className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center hover:bg-primary-100 transition-colors"
                title="New Note"
              >
                <Plus size={18} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              <AnimatePresence>
                {notes.map(note => (
                  <motion.div
                    key={note.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => handleSelectNote(note)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                      activeNote?.id === note.id 
                        ? 'bg-white border-primary-300 shadow-sm' 
                        : 'bg-white/50 border-transparent hover:bg-white hover:border-surface-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`font-bold text-sm truncate pr-4 ${activeNote?.id === note.id ? 'text-primary-700' : 'text-surface-900'}`}>
                        {note.title}
                      </h3>
                      {activeNote?.id === note.id && (
                        <button 
                          onClick={(e) => handleDeleteNote(e, note.id)}
                          className="text-surface-300 hover:text-red-500 transition-colors shrink-0"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-surface-400 mb-2 flex items-center gap-1">
                      <Calendar size={10} />
                      {new Date(note.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-sm text-surface-500 line-clamp-2 leading-relaxed">
                      {note.content}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Panel: Editor */}
          <div className="flex-1 flex flex-col bg-white">
            {activeNote ? (
              <>
                <div className="p-6 border-b border-surface-100 flex justify-between items-center bg-white">
                  <div className="text-sm font-semibold text-surface-400 flex items-center gap-2">
                    <Calendar size={16} /> 
                    Last edited on {new Date(activeNote.date).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}
                  </div>
                  <div className="flex gap-2">
                    {isEditing ? (
                      <button 
                        onClick={handleSaveNote}
                        className="px-4 py-2 bg-primary-600 text-white text-sm font-bold rounded-xl shadow-sm hover:bg-primary-700 transition-colors flex items-center gap-2"
                      >
                        <Save size={16} /> Save Changes
                      </button>
                    ) : (
                      <button 
                        onClick={handleEditNote}
                        className="px-4 py-2 bg-surface-100 text-surface-700 text-sm font-bold rounded-xl hover:bg-surface-200 transition-colors flex items-center gap-2"
                      >
                        <Edit3 size={16} /> Edit Note
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 lg:p-12">
                  <div className="max-w-2xl mx-auto h-full flex flex-col">
                    {isEditing ? (
                      <>
                        <input 
                          type="text" 
                          value={editForm.title}
                          onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                          className="text-4xl font-extrabold text-surface-900 border-none outline-none bg-transparent mb-6 placeholder:text-surface-300 w-full"
                          placeholder="Note Title"
                          autoFocus
                        />
                        {/* Fake Rich Text Toolbar */}
                        <div className="flex items-center gap-2 border-y border-surface-200 py-2 mb-6">
                          <button className="p-2 rounded-lg hover:bg-surface-100 text-surface-600"><Bold size={18} /></button>
                          <button className="p-2 rounded-lg hover:bg-surface-100 text-surface-600"><Italic size={18} /></button>
                          <div className="w-px h-6 bg-surface-200 mx-1" />
                          <button className="p-2 rounded-lg hover:bg-surface-100 text-surface-600"><ListIcon size={18} /></button>
                        </div>
                        <textarea 
                          value={editForm.content}
                          onChange={(e) => setEditForm({...editForm, content: e.target.value})}
                          className="flex-1 w-full text-lg text-surface-700 leading-relaxed border-none outline-none bg-transparent resize-none placeholder:text-surface-300"
                          placeholder="Start writing your journal entry or note here..."
                        />
                      </>
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h1 className="text-4xl font-extrabold text-surface-900 mb-8">{activeNote.title}</h1>
                        <div className="prose prose-lg prose-surface max-w-none">
                          <p className="text-surface-700 leading-relaxed whitespace-pre-wrap text-lg">
                            {activeNote.content}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-surface-400 font-semibold">
                Select a note to read or edit.
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default TripNotes;
