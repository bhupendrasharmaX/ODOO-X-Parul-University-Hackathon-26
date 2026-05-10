import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import useAuth from './hooks/useAuth';
import { ToastProvider } from './context/ToastContext';

// Lazy load pages for performance
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CreateTrip = lazy(() => import('./pages/CreateTrip'));
const MyTrips = lazy(() => import('./pages/MyTrips'));
const ItineraryBuilder = lazy(() => import('./pages/ItineraryBuilder'));
const ItineraryView = lazy(() => import('./pages/ItineraryView'));
const CitySearch = lazy(() => import('./pages/CitySearch'));
const ActivitySearch = lazy(() => import('./pages/ActivitySearch'));
const Budget = lazy(() => import('./pages/Budget'));
const PackingChecklist = lazy(() => import('./pages/PackingChecklist'));
const SharedItinerary = lazy(() => import('./pages/SharedItinerary'));
const Profile = lazy(() => import('./pages/Profile'));
const TripNotes = lazy(() => import('./pages/TripNotes'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Page transition wrapper
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

// Loading skeleton fallback
const PageLoader = () => (
  <div className="p-8 max-w-7xl mx-auto space-y-6 w-full animate-pulse">
    <div className="h-12 bg-surface-200 rounded-xl w-1/3" />
    <div className="h-4 bg-surface-200 rounded-md w-1/4 mb-10" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="h-40 bg-surface-200 rounded-[20px]" />
      <div className="h-40 bg-surface-200 rounded-[20px]" />
      <div className="h-40 bg-surface-200 rounded-[20px]" />
    </div>
    <div className="h-64 bg-surface-200 rounded-[20px] w-full" />
  </div>
);

const App = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Pages that don't show the sidebar
  const noNavPages = ['/login', '/share'];
  const showNav = isAuthenticated && !noNavPages.some((p) => location.pathname.startsWith(p));

  return (
    <ToastProvider>
      <div className="min-h-screen bg-surface-50 text-surface-900 font-sans">
        {showNav && <Sidebar />}

        <main className={showNav ? 'lg:ml-[260px] min-h-screen transition-all duration-300 flex flex-col' : 'min-h-screen flex flex-col'}>
          {showNav && <Navbar />}
          <div className="w-full flex-1">
            <AnimatePresence mode="wait">
              <Suspense fallback={<PageLoader />}>
                <Routes location={location} key={location.pathname}>
                  {/* Public routes */}
                  <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <PageWrapper><Login /></PageWrapper>} />
                  <Route path="/share/:tripId" element={<PageWrapper><SharedItinerary /></PageWrapper>} />

                  {/* Protected routes */}
                  <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
                  <Route path="/create-trip" element={<ProtectedRoute><PageWrapper><CreateTrip /></PageWrapper></ProtectedRoute>} />
                  <Route path="/trips" element={<ProtectedRoute><PageWrapper><MyTrips /></PageWrapper></ProtectedRoute>} />
                  <Route path="/itinerary/:tripId" element={<ProtectedRoute><PageWrapper><ItineraryView /></PageWrapper></ProtectedRoute>} />
                  <Route path="/itinerary/build/:tripId" element={<ProtectedRoute><PageWrapper><ItineraryBuilder /></PageWrapper></ProtectedRoute>} />
                  <Route path="/cities" element={<ProtectedRoute><PageWrapper><CitySearch /></PageWrapper></ProtectedRoute>} />
                  <Route path="/activities" element={<ProtectedRoute><PageWrapper><ActivitySearch /></PageWrapper></ProtectedRoute>} />
                  <Route path="/budget/:tripId" element={<ProtectedRoute><PageWrapper><Budget /></PageWrapper></ProtectedRoute>} />
                  <Route path="/checklist/:tripId" element={<ProtectedRoute><PageWrapper><PackingChecklist /></PageWrapper></ProtectedRoute>} />
                  <Route path="/notes/:tripId" element={<ProtectedRoute><PageWrapper><TripNotes /></PageWrapper></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><PageWrapper><Profile /></PageWrapper></ProtectedRoute>} />

                  {/* Admin route */}
                  <Route path="/admin" element={<ProtectedRoute adminOnly><PageWrapper><AdminDashboard /></PageWrapper></ProtectedRoute>} />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </ToastProvider>
  );
};

export default App;
