import { Link } from 'react-router-dom';
import { Bell, Moon } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 w-full bg-[#F8FAFC]/80 backdrop-blur-md border-b border-surface-200 h-20 flex items-center justify-between px-6 md:px-10">
      
      {/* Left Links */}
      <nav className="hidden md:flex items-center gap-8">
        <Link to="/trips" className="text-sm font-semibold text-surface-600 hover:text-surface-900 transition-colors">Itineraries</Link>
        <Link to="/concierge" className="text-sm font-semibold text-surface-600 hover:text-surface-900 transition-colors">Concierge</Link>
        <Link to="/support" className="text-sm font-semibold text-surface-600 hover:text-surface-900 transition-colors">Support</Link>
      </nav>
      
      {/* Spacer for Mobile */}
      <div className="flex-1 md:hidden" />

      {/* Right Actions */}
      <div className="flex items-center gap-5">
        <button className="text-surface-600 hover:text-surface-900 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <button className="text-surface-600 hover:text-surface-900 transition-colors">
          <Moon size={20} />
        </button>
        <button className="hidden sm:block px-5 py-2 bg-primary-600 hover:bg-primary-500 text-white font-bold text-sm rounded-lg transition-colors shadow-[0_4px_14px_rgba(79,70,229,0.4)]">
          Upgrade
        </button>
        
        {/* Avatar */}
        <Link to="/profile" className="w-10 h-10 rounded-full overflow-hidden ml-2 shadow-md hover:shadow-lg transition-shadow border-2 border-white">
          {user?.avatar ? (
            <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0) || 'A'}
            </div>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
