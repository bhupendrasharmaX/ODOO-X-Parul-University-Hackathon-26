import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Plane, Loader2 } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import useAuth from '../hooks/useAuth';
import { forgotPassword } from '../api/auth';

const bgImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD8wY3Poim9xV2BVDwikExBD1BF-zCvSfXZtnN4MdATKOzpL6FM83YuW6WNt21RFLHOQkg2hyWQC8u6qPJOO5X19v_dvVATYajKdEPiyaktJaEsRBC7TezCJWxjgPkQ9yDcCWPglQqVjJxeS5DoIwFEqDRYcT9DRYYyMChAvf306tOPx0vbWmA0rH_bsqUdwAN1_QHOVcFjgBf4oZPvV8x0NqYscAfxgMwVIwfZcRu0MhmDOfK4Ky1iUmFtDzbqrxMZEUZzWztkpKU',
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1400&q=85',
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1400&q=85',
];

const tags = ['Paris', 'Bali', 'Tokyo', 'Dubai'];

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [bgIdx, setBgIdx] = useState(0);
  const { login, register, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        setError('');
        await googleLogin(tokenResponse.access_token);
        navigate('/dashboard');
      } catch (err) {
        setError(err.message || 'Google login failed');
        setLoading(false);
      }
    },
    onError: () => {
      setError('Google login failed');
    },
    prompt: 'select_account'
  });

  // Rotate background images every 5s
  useEffect(() => {
    const id = setInterval(() => setBgIdx(i => (i + 1) % bgImages.length), 5000);
    return () => clearInterval(id);
  }, []);

  const handleChange = (e) => { 
    setForm({ ...form, [e.target.name]: e.target.value }); 
    setError(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
      if (activeTab === 'login') {
        await login({ email: form.email, password: form.password });
        navigate('/dashboard');
      } else {
        if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); setLoading(false); return; }
        await register({ name: form.name, email: form.email, password: form.password });
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally { setLoading(false); }
  };

  const handleForgot = async () => {
    if (!form.email) { setError('Please enter your email first.'); return; }
    setLoading(true); setError(''); setSuccess('');
    try {
      await forgotPassword(form.email);
      setSuccess('Password reset link sent to your email.');
    } catch (err) {
      setError(err.message || 'Failed to send reset link.');
    } finally { setLoading(false); }
  };

  return (
    <main className="flex min-h-screen w-full bg-surface-50 text-surface-900 antialiased">
      
      {/* LEFT PANEL (55%) - Hidden on mobile, visible md and up */}
      <section className="hidden md:flex relative w-[55%] flex-col justify-end p-10 overflow-hidden bg-[#302f39]">
        {/* Background Image with Crossfade */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={bgIdx}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${bgImages[bgIdx]}')` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-2xl text-white">
          <p className="text-xs font-bold tracking-widest uppercase mb-4 text-white/80">Premium Concierge</p>
          <h1 className="font-display text-5xl lg:text-6xl mb-8 leading-tight text-white font-bold tracking-tight">
            "The world is a book, and those who do not travel read only a page."
          </h1>
          
          {/* Floating Destination Tags */}
          <div className="flex flex-wrap gap-3 mt-8">
            {tags.map((tag) => (
              <span key={tag} className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-widest uppercase text-white shadow-lg">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* RIGHT PANEL (45%) */}
      <section className="w-full md:w-[45%] bg-white flex flex-col justify-center items-center px-8 md:px-12 lg:px-16 py-8 overflow-y-auto">
        <div className="w-full max-w-[420px]">
          
          {/* Brand Anchor */}
          <div className="mb-8 text-center md:text-left">
            <span className="font-display text-2xl font-black text-primary-600 flex items-center justify-center md:justify-start gap-2">
              <Plane size={24} className="fill-current" />
              Elite Travel
            </span>
          </div>
          
          {/* Header */}
          <div className="mb-8 text-center md:text-left">
            <h2 className="font-display text-3xl font-bold text-surface-900 mb-2">
              {activeTab === 'login' ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-base text-surface-500">
              {activeTab === 'login' 
                ? 'Access your personalized itineraries and concierge services.' 
                : 'Join our exclusive community of travelers.'}
            </p>
          </div>

          {/* Toggle */}
          <div className="flex p-1 mb-8 bg-surface-100 rounded-full w-full max-w-[280px] mx-auto md:mx-0">
            <button 
              onClick={() => { setActiveTab('login'); setError(''); }}
              className={`flex-1 py-2 px-4 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${
                activeTab === 'login' ? 'bg-white shadow-sm text-surface-900' : 'text-surface-500 hover:text-surface-900'
              }`}
            >
              Log In
            </button>
            <button 
              onClick={() => { setActiveTab('signup'); setError(''); }}
              className={`flex-1 py-2 px-4 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${
                activeTab === 'signup' ? 'bg-white shadow-sm text-surface-900' : 'text-surface-500 hover:text-surface-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mb-4 font-medium text-center md:text-left">{error}</p>}
          {success && <p className="text-emerald-500 text-sm mb-4 font-medium text-center md:text-left">{success}</p>}

          {/* Form */}
          <form className="space-y-4 flex flex-col gap-2" onSubmit={handleSubmit}>
            
            {activeTab === 'signup' && (
              <div className="relative">
                <input 
                  id="name" name="name" type="text" placeholder=" " required value={form.name} onChange={handleChange}
                  className="peer block w-full px-4 pb-3 pt-4 text-sm text-surface-900 bg-transparent rounded-xl border border-surface-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-600 transition-all" 
                />
                <label htmlFor="name" className="absolute text-sm text-surface-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3 pointer-events-none">
                  Full Name
                </label>
              </div>
            )}

            {/* Floating Label Input: Email */}
            <div className="relative">
              <input 
                id="email" name="email" type="email" placeholder=" " required value={form.email} onChange={handleChange}
                className="peer block w-full px-4 pb-3 pt-4 text-sm text-surface-900 bg-transparent rounded-xl border border-surface-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-600 transition-all" 
              />
              <label htmlFor="email" className="absolute text-sm text-surface-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3 pointer-events-none">
                Email Address
              </label>
            </div>

            {/* Floating Label Input: Password */}
            <div className="relative">
              <input 
                id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder=" " required value={form.password} onChange={handleChange}
                className="peer block w-full px-4 pb-3 pt-4 text-sm text-surface-900 bg-transparent rounded-xl border border-surface-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-600 transition-all pr-12" 
              />
              <label htmlFor="password" className="absolute text-sm text-surface-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3 pointer-events-none">
                Password
              </label>
              <button 
                type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-500 hover:text-surface-900 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {activeTab === 'signup' && (
              <div className="relative">
                <input 
                  id="confirmPassword" name="confirmPassword" type={showPassword ? 'text' : 'password'} placeholder=" " required value={form.confirmPassword} onChange={handleChange}
                  className="peer block w-full px-4 pb-3 pt-4 text-sm text-surface-900 bg-transparent rounded-xl border border-surface-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-600 transition-all pr-12" 
                />
                <label htmlFor="confirmPassword" className="absolute text-sm text-surface-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3 pointer-events-none">
                  Confirm Password
                </label>
              </div>
            )}

            {activeTab === 'login' && (
              <div className="flex items-center justify-between mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded text-primary-600 focus:ring-primary-600 border-surface-300" />
                  <span className="text-sm text-surface-500">Remember me</span>
                </label>
                <button type="button" onClick={handleForgot} className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" disabled={loading}
              className="w-full py-3.5 mt-2 bg-primary-600 text-white rounded-xl text-xs font-bold tracking-widest uppercase shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-70 disabled:scale-100"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : (
                <>
                  {activeTab === 'login' ? 'Continue Journey' : 'Begin Journey'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="h-px bg-surface-200 flex-1"></div>
            <span className="text-xs font-bold tracking-widest uppercase text-surface-500">Or continue with</span>
            <div className="h-px bg-surface-200 flex-1"></div>
          </div>

          {/* Social Sign In */}
          <button 
            type="button" 
            onClick={() => handleGoogleLogin()}
            className="w-full py-3.5 border border-surface-300 rounded-xl flex items-center justify-center gap-3 bg-white hover:bg-surface-50 transition-colors duration-200 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            <span className="text-base text-surface-900 font-semibold">Google</span>
          </button>

          {/* Footer Text */}
          <p className="text-center text-sm text-surface-500 mt-8">
            By continuing, you agree to our <a href="#" className="text-primary-600 hover:underline">Terms of Service</a> and <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>.
          </p>
          
        </div>
      </section>
    </main>
  );
};

export default Login;
