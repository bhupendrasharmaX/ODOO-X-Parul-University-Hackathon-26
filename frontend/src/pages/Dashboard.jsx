import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plane, Verified, CheckSquare, Compass, Ticket, Briefcase, Plus, ArrowRight } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const mockUpcomingTrips = [
  {
    id: 1,
    name: 'Parisian Getaway',
    dates: 'Oct 12 - Oct 20 • 2 Travelers',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQFBvowyhh6BjmbNnY8B-qyYeYDKePXfgJfs1tZ8uIO6uBgF2fDICGhO5syIbOrvR9POy5wcfGA9gkugPU2WIz8kju3M-ZGqBSSTGADkCbvMGibDeA3MoHg4SK97Q6TLuOpoZJm73ccbDnkNdEWYnCYdPo7sPKi4xgxk5EiBY9EDR4mnK0gHEudQSWSDuwj6CuaVZP92l10PlNr0hmgc-UFyUX13aEpxbFNCt4ZqMA49jbVQBKFIryNPdyJSwhNjwpE5qzTCpHhR8',
    statusBadge: 'IN 14 DAYS',
    avatars: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAQxkrYQ8FZ9-6_-2r2mAYzriRNG4kUp_njgMpPB10sEeMdYZ3AVIWLDI_urCh---MtN1QvaCBXv38UrPug4mxK332cvfLwYaXJN_96aJsxcBxVB-EhQEba4XxsrTR5I1JpKSqkumXj67oVz3ql0MeqXD5coZM3zwzrEBl4QggCwP9o5P5U3Sf0ST_4CspOXQliNPgicKP1fzUpqA1ShojSSqn3ypVZ-ZRRz3mWuPp8oEsqyrPoEzd6JGX4ihTcvHOx8hGHU9mR8wI', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkGHOsUzzznyPfIHA12dohmulXz5J8_mBPJGhBBtXXF9v8gNt534y_sXh4OkQqYXFmiUUw5R8GsDoFe0TY642vjqjXhwjUx3XwDKBXz_VeKsc2Rml9NB76FvZtzfx9FoFXPUQH_qm1zRQvLLC6jM-mMC42OJrdhoAdaAq0r4H3xeDnho4TBsxj0l372eqqx5BTblkTgEyL9UE3JrlifBHtU5Pi0YGGZodM6RHJ6m9aLRC3BQ1yNR8DktGGcq7ZcyEYE4OAIWyf6-w'],
    actionText: 'Manage'
  },
  {
    id: 2,
    name: 'Tokyo Tech & Temples',
    dates: 'Dec 05 - Dec 18 • 1 Traveler',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBd17A6LmZp6Sb0Oup-nYBaAjJLhiIAS732IuZZF54yBSlv00bv4UHBYHzISqvWUTbsrO5XqtYvFBzxcZsX0OVcI9SnSplrrrSG6KHo0hvrpFs5KhLw-GM0_EDSDHOAPgeAhu2jtTw5IpbOGENFsIO5xF8OfVRRxdQVaQXtsO3UaYAY3lBNx3FLbFtk08NUXfz7jcsRRlsHVOo6l-mEfwo89okmiCprB6pu3KpJ2fyNQ7OfSXLO-SNJbB5gM5glLcuzzjixaqq6Sl4',
    statusBadge: 'PLANNING',
    avatars: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBkWOG4sWCkbdfPFrwZ5tXElZi-G3F_rr2Grybc2K47qcdKa0a3GK45h9P5JKsv7LDAWc6t99vxpNgGI9GMMwbS6l1O8Gl-q-b1ZCEN-eAgZTuEeqlt-TPlz26-HG4AxbpSyuT_l93WNvbP2rn-sIZPJcfMOep9O8W05tdcSaRWnFgn6zlF0BbQOQOA2yOgtrajcKcsfVnTAFEMlP3AB0TfFZXkqnm0ddW9xhwJ9dxGVy5RzThuIAhvmBsPgiKf8iEGzDrEFYiTXqU'],
    actionText: 'Resume'
  }
];

const mockInspirations = [
  { id: 1, name: 'Amalfi Coast', tag: 'COASTAL RETREAT', desc: 'Experience the dramatic cliffs and luxury villas of southern Italy.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhTF67VHzD1OtKHIWuFOcL_b-ys2Gw8SC6yDadfj73QViPuj1U3UsmR8kIhTKiA1XnZRfsQ5kjei4mpWNa1ev31B5Hz8S_n1p8oDqEdGyR4bLM4Js0lflxkQiHHdFC6w5bUvIG0LoEIVHfJEo6PjZ4K7ERupfQzCHTDIjHiNEg42bVUXvUym4sW8GwT-h-5TYNIIVbs9kEcjHGLgKJcNneNcSykU8ul5E04c7bUaKqpH1IP13EHlXe1RvkD_KXCmliD3NcMaFA9zs' },
  { id: 2, name: 'Dubai', tag: 'MODERN LUXURY', desc: 'Discover unparalleled opulence and cutting-edge architecture.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3rzg2j_f5O4yGmH7JfE8nCoidumgDHP_eIde2HFkDrQmNtDjrcGqlb8XkzJ1WXnS3gaEG0tG91JJkzb7YJ7BveS8OzwHfIoq0uLW-wMPt-EPALOkIxsA84ObOZw7g6c8tXyj3u3VxQqRDyTZtvtjUxTCcWVVwau1OXZ90yEyuNG1NnyUVYQcUNXhnXyEbEovfz8CKpceMFOI8N0d08SFsVLeRAVQRJ-5Gne6MyvG4M4egPqpViEBvNlRNnyXWIwhxPMj8WMBjCTU' },
  { id: 3, name: 'Zermatt', tag: 'ALPINE ESCAPE', desc: 'Exclusive ski resorts nestled below the iconic Matterhorn.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVKO5F8m9MdkwAcIG-rb1MnWK9mTP-uUNckCq5srRbeAywkWkBWUcGHgK90aqjR9ERwmBQNxab0doC3OKs2KEXUFitjGpxVfK8o_5wnwAkOeR5al2zJg7OaW487JfB4VlimLp2UC3yQYk6leChNcnnhAFLaXdS-mlKKsC3gXCPn2eZKXU35GO0cxzYshjTr6wyqLGzncvTMcKw1fm_n0BmQJKzAIQ5w-vftF9CTZYYs7KMNjtTjfh6H5TRQnNH34QOMRsd907ulxQ' }
];

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return (
      <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-12 animate-pulse">
        <div className="h-[320px] bg-surface-200 rounded-[20px] w-full" />
        <div className="h-32 bg-surface-200 rounded-[20px]" />
      </div>
    );
  }

  const firstName = user?.name ? user.name.split(' ')[0] : 'Alexander';

  return (
    <div className="pb-24 font-sans bg-[#fcf8ff] min-h-[calc(100vh-80px)]">
      <div className="p-6 md:p-10 max-w-[1440px] mx-auto space-y-12">
        
        {/* Hero Section */}
        <section className="relative h-[320px] rounded-[20px] overflow-hidden flex items-end p-8 shadow-[0_4px_24px_rgba(79,70,229,0.15)]">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Paris skyline" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQgL3HeQol4ZDFku4yL_hCZf18yGmWkhuurZjQGYf5Qj_QHpSc1dqw5WPzIJ0iUCcZrGLoeFO6hoDWaerb7KADUWppz1WWs0oQnnYxl8j62mDWj-G1Fv-zTqyrdPB2jpNQBchXgPGwaPH6oFTSrugExJYj6nqq5ITSTU3452oajwRKoZSd_vJQV2pJbzeeDjgCqlGtxeJjESpbPWnW83d8nCfzLCK16-d7Rwmya8tBhJwqQgEns3sU3sYj6d0lqyB1r0kaMrHSOkQ" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          </div>
          <div className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-[20px] p-6 text-white shadow-xl">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-2">Good Morning, {firstName}</h2>
            <p className="text-lg text-white/90">Your next adventure to Paris begins in 14 days. We've curated some new dining experiences for you.</p>
          </div>
        </section>

        {/* Stats & Quick Actions Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Stats Bento */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-[20px] p-6 border border-surface-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold tracking-widest uppercase text-surface-500">Upcoming Trips</span>
                <span className="text-primary-600 bg-primary-50 p-2 rounded-full"><Plane size={20} /></span>
              </div>
              <div>
                <span className="font-display text-5xl font-bold text-surface-900 block mb-1">3</span>
                <span className="text-sm text-surface-500">+1 this month</span>
              </div>
            </div>
            
            <div className="bg-white rounded-[20px] p-6 border border-surface-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold tracking-widest uppercase text-surface-500">Completed</span>
                <span className="text-amber-600 bg-amber-50 p-2 rounded-full"><Verified size={20} /></span>
              </div>
              <div>
                <span className="font-display text-5xl font-bold text-surface-900 block mb-1">12</span>
                <span className="text-sm text-surface-500">across 8 countries</span>
              </div>
            </div>

            <div className="bg-primary-600 rounded-[20px] p-6 border border-primary-500 text-white shadow-[0_8px_24px_rgba(79,70,229,0.25)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold tracking-widest uppercase text-white/80">Today's Tasks</span>
                <span className="text-white bg-white/20 p-2 rounded-full"><CheckSquare size={20} /></span>
              </div>
              <div>
                <span className="font-display text-5xl font-bold block mb-1">5</span>
                <span className="text-sm text-white/80">2 require attention</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link to="/cities" className="bg-gradient-to-br from-surface-50 to-surface-100 border border-surface-200 rounded-[20px] p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 group">
              <span className="text-primary-600 mb-3 group-hover:scale-110 transition-transform"><Compass size={32} /></span>
              <span className="text-sm font-bold text-surface-900">Explore<br/>Destinations</span>
            </Link>
            <Link to="/activities" className="bg-gradient-to-br from-surface-50 to-surface-100 border border-surface-200 rounded-[20px] p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 group">
              <span className="text-primary-600 mb-3 group-hover:scale-110 transition-transform"><Ticket size={32} /></span>
              <span className="text-sm font-bold text-surface-900">Book<br/>Activities</span>
            </Link>
            <Link to="/trips" className="bg-gradient-to-br from-surface-50 to-surface-100 border border-surface-200 rounded-[20px] p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 group">
              <span className="text-primary-600 mb-3 group-hover:scale-110 transition-transform"><Briefcase size={32} /></span>
              <span className="text-sm font-bold text-surface-900">Manage<br/>Trips</span>
            </Link>
          </div>
        </section>

        {/* Recent Trips (Horizontal Scroll) */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-surface-900 mb-1">Your Upcoming Itineraries</h3>
              <p className="text-sm text-surface-500">Manage your detailed travel plans.</p>
            </div>
            <Link to="/trips" className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="flex overflow-x-auto hide-scrollbar gap-6 pb-4 -mx-6 px-6 md:mx-0 md:px-0">
            {mockUpcomingTrips.map(trip => (
              <div key={trip.id} className="min-w-[300px] md:min-w-[360px] bg-white rounded-[20px] border border-surface-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden flex-shrink-0">
                <div className="h-40 relative">
                  <img alt={trip.name} className="w-full h-full object-cover" src={trip.image} />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-primary-600 shadow-sm">
                    {trip.statusBadge}
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-display text-xl font-bold text-surface-900 mb-1">{trip.name}</h4>
                  <p className="text-sm text-surface-500 mb-4">{trip.dates}</p>
                  <div className="flex items-center justify-between border-t border-surface-200 pt-4">
                    <div className="flex -space-x-2">
                      {trip.avatars.map((avatar, idx) => (
                        <img key={idx} alt="Traveler" className="w-8 h-8 rounded-full border-2 border-white" src={avatar} />
                      ))}
                    </div>
                    <Link to={`/itinerary/${trip.id}`} className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">
                      {trip.actionText}
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State / Add New */}
            <Link to="/create-trip" className="min-w-[300px] md:min-w-[360px] bg-surface-50 border-2 border-dashed border-surface-300 rounded-[20px] flex flex-col items-center justify-center p-6 flex-shrink-0 hover:bg-surface-100 transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus className="text-primary-600" size={24} />
              </div>
              <h4 className="font-display text-xl font-bold text-surface-900 mb-1 text-center">Plan a New Journey</h4>
              <p className="text-sm text-surface-500 text-center">Start crafting your next elite experience.</p>
            </Link>
          </div>
        </section>

        {/* Trending Destinations */}
        <section className="pb-12">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-surface-900 mb-1">Curated Inspiration</h3>
              <p className="text-sm text-surface-500">Trending destinations for your preferred travel style.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockInspirations.map(dest => (
              <Link to="/cities" key={dest.id} className="relative h-[400px] rounded-[20px] overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
                <img alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={dest.image} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-xs font-bold tracking-widest uppercase text-white/80 mb-2 block">{dest.tag}</span>
                  <h4 className="font-display text-3xl font-bold text-white mb-2">{dest.name}</h4>
                  <p className="text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    {dest.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
      
      {/* Hide scrollbar styles for horizontally scrolling container */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Dashboard;
