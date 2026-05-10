import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Settings, Shield, AlertTriangle,
  Camera, Edit2, Globe, Bell, Lock, Mail, Trash2, MapPin, X, Check
} from 'lucide-react';
import useAuth from '../hooks/useAuth';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'preferences', label: 'Preferences', icon: Settings },
  { id: 'privacy', label: 'Privacy', icon: Shield },
  { id: 'danger', label: 'Danger Zone', icon: AlertTriangle },
];

const Toggle = ({ on, onToggle }) => (
  <button onClick={onToggle}
    className="relative w-12 h-6 rounded-full transition-colors duration-200 shrink-0 flex items-center"
    style={{ backgroundColor: on ? '#4f46e5' : '#e2e8f0' }}>
    <motion.div className="w-5 h-5 bg-white rounded-full shadow-sm ml-0.5"
      animate={{ x: on ? 22 : 0 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
  </button>
);

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [savingState, setSavingState] = useState('idle'); // idle | saving | saved

  const [toggles, setToggles] = useState({
    pushNotifications: true,
    emailUpdates: false,
    publicProfile: true,
    marketingEmails: false,
  });

  const handleSave = () => {
    setSavingState('saving');
    setTimeout(() => { setSavingState('saved'); setTimeout(() => setSavingState('idle'), 2000); }, 1200);
    setIsEditing(false);
  };

  return (
    <div className="pb-16 font-sans bg-surface-50 min-h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="px-6 md:px-10 pt-12 pb-0 max-w-5xl mx-auto mb-8">
        <h1 className="font-display text-4xl font-bold text-surface-900 mb-1" style={{ letterSpacing: '-0.02em' }}>Account Settings</h1>
        <p className="text-surface-500">Manage your profile, preferences, and security.</p>
      </div>

      <div className="px-6 md:px-10 max-w-5xl mx-auto">
        <div className="bg-white rounded-[20px] overflow-hidden flex flex-col md:flex-row min-h-[580px]" style={{ boxShadow: 'var(--shadow-card)' }}>

          {/* Left Nav */}
          <div className="w-full md:w-56 bg-surface-50/50 border-r border-surface-100 p-4 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible shrink-0">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                  activeTab === id
                    ? id === 'danger'
                      ? 'bg-red-50 text-red-600 border-l-4 border-red-500'
                      : 'bg-primary-50 text-primary-700 border-l-4 border-primary-600'
                    : 'text-surface-600 hover:bg-white hover:shadow-sm'
                }`}>
                <Icon size={17} />{label}
              </button>
            ))}
          </div>

          {/* Right Content */}
          <div className="flex-1 p-8 md:p-10 overflow-y-auto">
            <AnimatePresence mode="wait">

              {/* PROFILE TAB */}
              {activeTab === 'profile' && (
                <motion.div key="profile" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="font-display text-2xl font-bold text-surface-900">Public Profile</h2>
                    <button onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                        isEditing ? 'bg-primary-600 text-white' : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
                      }`}>
                      {savingState === 'saving' ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
                        : savingState === 'saved' ? <><Check size={16} /> Saved!</>
                        : isEditing ? <><Check size={16} /> Save Changes</>
                        : <><Edit2 size={15} /> Edit Profile</>}
                    </button>
                  </div>

                  {/* Avatar */}
                  <div className="flex items-center gap-6 mb-10 pb-8 border-b border-surface-100">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #4f46e5, #f59e0b)' }}>
                        {user?.avatar ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" /> : (user?.name?.charAt(0) || 'U')}
                      </div>
                      {isEditing && (
                        <button className="absolute inset-0 bg-surface-900/60 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <Camera size={22} />
                        </button>
                      )}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-surface-900">{user?.name || 'Traveler'}</h3>
                      <p className="text-surface-500">{user?.email}</p>
                      {isEditing && <p className="text-xs text-primary-600 font-semibold mt-1 cursor-pointer hover:underline">Change avatar</p>}
                    </div>
                  </div>

                  <form className="space-y-5 max-w-lg">
                    {[{ label: 'Full Name', type: 'text', def: user?.name, ph: 'Your full name' }, { label: 'Email Address', type: 'email', def: user?.email, ph: 'your@email.com' }].map(field => (
                      <div key={field.label}>
                        <label className="block text-sm font-bold text-surface-700 mb-2">{field.label}</label>
                        <input type={field.type} defaultValue={field.def} disabled={!isEditing} placeholder={field.ph}
                          className="w-full px-4 py-3.5 bg-white border border-surface-200 rounded-xl font-medium text-surface-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/15 disabled:opacity-60 disabled:bg-surface-50 disabled:cursor-not-allowed outline-none transition-all" />
                      </div>
                    ))}

                    <div>
                      <label className="block text-sm font-bold text-surface-700 mb-2">Language</label>
                      <div className="relative">
                        <Globe size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
                        <select disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3.5 bg-white border border-surface-200 rounded-xl font-medium text-surface-900 disabled:opacity-60 disabled:bg-surface-50 disabled:cursor-not-allowed outline-none appearance-none focus:border-primary-500">
                          <option>English (US)</option><option>French (FR)</option><option>Spanish (ES)</option><option>Japanese (JP)</option>
                        </select>
                      </div>
                    </div>
                  </form>

                  {/* Saved Destinations */}
                  <div className="mt-10 pt-12 border-t border-surface-100">
                    <h3 className="font-semibold text-surface-900 mb-4">Saved Destinations</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Paris, France', 'Kyoto, Japan', 'Bali, Indonesia', 'Santorini, Greece'].map(dest => (
                        <span key={dest} className="flex items-center gap-2 px-3.5 py-2 bg-primary-50 border border-primary-100 text-primary-700 text-xs font-bold rounded-full">
                          <MapPin size={12} />{dest}
                          {isEditing && <X size={12} className="cursor-pointer hover:text-primary-900" />}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* PREFERENCES TAB */}
              {activeTab === 'preferences' && (
                <motion.div key="prefs" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                  <h2 className="font-display text-2xl font-bold text-surface-900 mb-8">Notification Preferences</h2>
                  <div className="space-y-4 max-w-lg">
                    {[
                      { key: 'pushNotifications', icon: Bell, label: 'Push Notifications', desc: 'Receive alerts about upcoming trips on your device.' },
                      { key: 'emailUpdates', icon: Mail, label: 'Email Updates', desc: 'Get travel inspiration and weekly newsletters.' },
                      { key: 'marketingEmails', icon: Globe, label: 'Marketing Emails', desc: 'Receive exclusive deals and travel offers.' },
                    ].map(({ key, icon: Icon, label, desc }) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-surface-50 rounded-2xl border border-surface-100">
                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-500 shrink-0">
                            <Icon size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-surface-900 text-sm">{label}</h4>
                            <p className="text-xs font-medium text-surface-500 mt-0.5">{desc}</p>
                          </div>
                        </div>
                        <Toggle on={toggles[key]} onToggle={() => setToggles(t => ({ ...t, [key]: !t[key] }))} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* PRIVACY TAB */}
              {activeTab === 'privacy' && (
                <motion.div key="privacy" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                  <h2 className="font-display text-2xl font-bold text-surface-900 mb-8">Privacy Settings</h2>
                  <div className="space-y-4 max-w-lg">
                    <div className="flex items-center justify-between p-4 bg-surface-50 rounded-2xl border border-surface-100">
                      <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-500 shrink-0">
                          <Lock size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-surface-900 text-sm">Public Profile</h4>
                          <p className="text-xs font-medium text-surface-500 mt-0.5">Allow others to view your shared itineraries.</p>
                        </div>
                      </div>
                      <Toggle on={toggles.publicProfile} onToggle={() => setToggles(t => ({ ...t, publicProfile: !t.publicProfile }))} />
                    </div>
                    <div className="p-4 bg-surface-50 rounded-2xl border border-surface-100">
                      <h4 className="font-bold text-surface-900 text-sm mb-2">Change Password</h4>
                      <div className="space-y-3">
                        {['Current Password', 'New Password', 'Confirm New Password'].map(ph => (
                          <input key={ph} type="password" placeholder={ph}
                            className="w-full px-4 py-3 bg-white border border-surface-200 rounded-xl text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/15 outline-none" />
                        ))}
                        <button className="px-5 py-2.5 bg-primary-600 text-white font-bold text-sm rounded-xl hover:bg-primary-700 transition-colors">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* DANGER ZONE TAB */}
              {activeTab === 'danger' && (
                <motion.div key="danger" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                  <h2 className="font-display text-2xl font-bold text-surface-900 mb-8">Danger Zone</h2>
                  <div className="border-2 border-red-100 bg-red-50/50 rounded-2xl p-6 max-w-lg">
                    <h3 className="font-bold text-red-700 flex items-center gap-2 mb-2 text-lg">
                      <AlertTriangle size={20} /> Delete Account
                    </h3>
                    <p className="text-sm font-medium text-red-600/80 mb-6">
                      Once you delete your account, there is no going back. All your trips, itineraries, and data will be permanently erased.
                    </p>
                    <button onClick={() => setShowDeleteModal(true)}
                      className="flex items-center gap-2 px-5 py-3 border-2 border-red-500 text-red-600 font-bold rounded-xl hover:bg-red-500 hover:text-white transition-all">
                      <Trash2 size={18} /> Delete My Account
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-surface-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowDeleteModal(false)}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="bg-white rounded-[24px] p-8 max-w-md w-full text-center" style={{ boxShadow: 'var(--shadow-modal)' }}>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                  <AlertTriangle size={30} />
                </div>
                <h3 className="font-display text-2xl font-bold text-surface-900 mb-2">Are you absolutely sure?</h3>
                <p className="text-surface-500 text-sm mb-6">Type <strong>DELETE</strong> below to confirm. This cannot be undone.</p>
                <input type="text" value={deleteConfirmText} onChange={e => setDeleteConfirmText(e.target.value)}
                  placeholder="Type DELETE to confirm"
                  className="w-full px-4 py-3.5 mb-5 bg-white border-2 border-surface-200 rounded-xl text-center font-bold text-surface-900 focus:border-red-400 focus:ring-2 focus:ring-red-400/15 outline-none" />
                <div className="flex gap-3">
                  <button onClick={() => { setShowDeleteModal(false); setDeleteConfirmText(''); }}
                    className="flex-1 py-3 bg-surface-100 text-surface-700 font-bold rounded-xl hover:bg-surface-200 transition-colors">
                    Cancel
                  </button>
                  <button disabled={deleteConfirmText !== 'DELETE'}
                    className="flex-1 py-3 text-white font-bold rounded-xl transition-all disabled:opacity-40 bg-red-500 hover:bg-red-600 disabled:cursor-not-allowed">
                    Delete Forever
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
