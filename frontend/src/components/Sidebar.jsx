import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  PlusCircle,
  Globe,
  Wallet,
  CheckSquare,
  ShieldAlert,
  Target,
  Settings,
  LogOut,
  X,
  Menu,
  Plus,
  Camera,
} from 'lucide-react';
import useAuth from '../hooks/useAuth';


const navLinks = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/trips', label: 'My Trips', icon: Map },
  { path: '/cities', label: 'Explore', icon: Globe },
  { path: '/activities', label: 'Activities', icon: Target },
  { path: '/budget', label: 'Budget', icon: Wallet },
  { path: '/checklist', label: 'Checklist', icon: CheckSquare },
  { path: '/create-trip', label: 'New Trip', icon: PlusCircle },
  { path: '/admin', label: 'Admin', icon: ShieldAlert },
];


const Sidebar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };
  const isActive = (path) => location.pathname.startsWith(path);

  const links = useMemo(() => {
    if (!isAuthenticated) return [];
    return navLinks.filter((l) => (l.path === '/admin' ? isAdmin : true));
  }, [isAdmin, isAuthenticated]);

  if (!isAuthenticated) return null;


  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="relative px-6 pt-9 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-display font-bold text-lg" style={{ background: 'linear-gradient(135deg, #4F46E5, #3730A3)' }}>
            T
          </div>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight">Traveloop</h1>
        </div>
      </div>

      {/* New Trip CTA */}
      <div className="px-5 mb-6">
        <Link
          to="/create-trip"
          className="w-full flex items-center justify-center gap-2 py-3 rounded-[10px] text-white font-bold text-sm"
          style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)', boxShadow: '0 4px 14px rgba(79,70,229,0.4)' }}
        >
          <Plus size={18} /> New Trip
        </Link>
      </div>


      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-2 overflow-y-auto">
        {links.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            onClick={() => setMobileOpen(false)}
            className={`relative flex items-center gap-3 px-3 h-[44px] rounded-[8px] transition-all duration-200 ${
              isActive(path)
                ? 'bg-[rgba(79,70,229,0.3)] text-white border-l-[3px] border-l-[#4F46E5] pl-[11px]'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Icon size={18} className="shrink-0" />
            <span className="text-[14px] font-semibold">{label}</span>
          </Link>
        ))}
      </nav>

      {/* Divider line */}
      <div className="mx-6 mt-3 mb-4 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

      {/* Bottom user */}
      <div className="px-6 pb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shrink-0"
            style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #F59E0B 100%)' }}
          >
            {user?.avatar ? (
              <img src={user.avatar} alt="avatar" className="w-full h-full object-cover rounded-full" />
            ) : (
              (user?.name?.charAt(0) || 'U').toUpperCase()
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-white truncate">{user?.name || 'Traveler'}</p>
            <p className="text-xs text-white/60 truncate">{user?.email || ''}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 w-full flex items-center justify-center gap-2 h-[40px] rounded-[10px] text-white bg-white/0 hover:bg-red-600/15 transition-all hover:text-red-200"
          style={{ color: 'rgba(255,255,255,0.9)' }}
        >
          <LogOut size={16} />
          <span className="text-[14px] font-semibold">Logout</span>
        </button>

      </div>

    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-xl text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #0f172a, #1e1b4b)' }}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-[260px] z-40 transition-transform duration-300 ease-in-out flex flex-col ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{
          background: 'linear-gradient(180deg, #0F172A 0%, #1E1B4B 100%)',
          borderRight: '1px solid rgba(79,70,229,0.3)',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: -1,
            top: 0,
            bottom: 0,
            width: 1,
            background: 'rgba(79,70,229,0.3)',
            boxShadow: '0 0 18px rgba(79,70,229,0.45)',
            pointerEvents: 'none',
          }}
        />
        <SidebarContent />
      </aside>


      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-surface-900/60 backdrop-blur-sm z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile bottom nav */}
      <div
        className="lg:hidden mobile-bottom-nav"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,1) 100%)',
          borderTop: '1px solid rgba(226,232,240,1)',
        }}
      >
        {navLinks.slice(0, 5).map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex-1 flex flex-col items-center justify-center gap-1 h-[64px] text-[11px] font-semibold transition-all rounded-none ${
              isActive(path)
                ? 'text-[#4F46E5]' 
                : 'text-[#64748B] hover:text-[#4F46E5]'
            }`}
            style={{
              paddingBottom: 6,
            }}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        ))}
      </div>

    </>
  );
};

export default Sidebar;
