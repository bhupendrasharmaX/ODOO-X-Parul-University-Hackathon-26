import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container fixed top-6 right-6 z-[9999] flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`toast flex items-center gap-3 p-4 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] min-w-[280px] max-w-[360px] border-l-4 ${
                toast.type === 'success' ? 'border-emerald-500' :
                toast.type === 'error' ? 'border-red-500' :
                'border-indigo-500'
              }`}
            >
              {toast.type === 'success' && <CheckCircle className="text-emerald-500 shrink-0" size={20} />}
              {toast.type === 'error' && <AlertCircle className="text-red-500 shrink-0" size={20} />}
              {toast.type === 'info' && <Info className="text-indigo-500 shrink-0" size={20} />}
              
              <p className="text-sm font-semibold text-surface-900 flex-1">{toast.message}</p>
              
              <button 
                onClick={() => removeToast(toast.id)}
                className="text-surface-400 hover:text-surface-700 transition-colors p-1"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
