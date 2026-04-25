import React, { useState } from 'react';
import { 
  User, 
  Camera, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Calendar, 
  Languages, 
  Bell, 
  LogOut, 
  ChevronRight,
  Shield,
  Target,
  Edit2,
  Trash2,
  Check,
  X,
  Globe,
  Settings
} from 'lucide-react';
import { UserProfile } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileProps {
  user: UserProfile;
  onUpdateUser: (data: Partial<UserProfile>) => void;
  onLogout: () => void;
}

export default function Profile({ user, onUpdateUser, onLogout }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<UserProfile>(user);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleSave = () => {
    onUpdateUser(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(user);
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-8 pb-32">
      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutConfirm(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center"
            >
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <LogOut size={32} />
              </div>
              <h3 className="text-2xl font-bold text-ink mb-2">Wait, walking out?</h3>
              <p className="text-gray-500 mb-8">Are you sure you want to log out of your Digital Gateway?</p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-6 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={onLogout}
                  className="flex-1 px-6 py-4 rounded-xl bg-red-500 text-white font-bold shadow-lg shadow-red-200 hover:scale-105 active:scale-95 transition-all"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Header / Profile Hero */}
      <div className="bg-white p-10 rounded-[3rem] border border-teal-50 shadow-soft relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full -ml-24 -mb-24 blur-3xl opacity-30"></div>
        
        <div className="relative flex flex-col md:flex-row items-center md:items-end gap-8">
          <div className="relative">
            <div className="w-40 h-40 rounded-[2.5rem] border-8 border-white shadow-2xl overflow-hidden bg-primary-light">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute -bottom-2 -right-2 p-3 bg-primary text-white rounded-2xl border-4 border-white shadow-lg hover:scale-110 active:scale-95 transition-all">
              <Camera size={20} />
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-1">
            <h1 className="text-4xl font-black text-ink">{user.name || 'Set your name'}</h1>
            <p className="text-lg text-text-muted font-medium flex items-center justify-center md:justify-start gap-2">
              <Globe size={18} className="text-primary" />
              {user.nationality || 'Nationality'} • {user.city || 'Portugal' }
            </p>
          </div>

          <div className="flex gap-3">
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                <Edit2 size={18} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-gray-100 text-gray-500 font-bold px-6 py-3 rounded-2xl hover:bg-gray-200 transition-all"
                >
                  <X size={18} />
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                >
                  <Check size={18} />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
            <div className="flex items-center gap-2 mb-8 font-bold text-xl text-ink">
              <User className="text-primary" size={24} />
              <h3>Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Field 
                label="Full Name" 
                value={editData.name} 
                isEditing={isEditing} 
                onChange={(v) => setEditData({...editData, name: v})}
                icon={User}
              />
              <Field 
                label="Nationality" 
                value={editData.nationality} 
                isEditing={isEditing} 
                onChange={(v) => setEditData({...editData, nationality: v})}
                icon={Globe}
              />
              <Field 
                label="University" 
                value={editData.university} 
                isEditing={isEditing} 
                onChange={(v) => setEditData({...editData, university: v})}
                icon={GraduationCap}
              />
              <Field 
                label="Arrival Date" 
                value={editData.arrivalDate} 
                type="date"
                isEditing={isEditing} 
                onChange={(v) => setEditData({...editData, arrivalDate: v})}
                icon={Calendar}
              />
            </div>
          </section>

          {/* Account & Security */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
            <div className="flex items-center gap-2 mb-8 font-bold text-xl text-ink">
              <Shield className="text-accent" size={24} />
              <h3>Account & Security</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-text-muted">
                    <Mail size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</p>
                    <p className="font-bold text-ink">{user.name.toLowerCase().replace(' ', '.')}@example.com</p>
                  </div>
                </div>
                <button className="text-primary font-bold text-sm hover:underline">Change</button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-text-muted">
                    <Shield size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Password</p>
                    <p className="font-bold text-ink">••••••••••••</p>
                  </div>
                </div>
                <button className="text-primary font-bold text-sm hover:underline">Edit</button>
              </div>
            </div>
          </section>

          {/* Personalization */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
            <div className="flex items-center gap-2 mb-8 font-bold text-xl text-ink">
              <Target className="text-primary" size={24} />
              <h3>Personalization</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Relocation Goal</label>
                <select 
                  disabled={!isEditing}
                  value={editData.motivation}
                  onChange={(e) => setEditData({...editData, motivation: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold text-ink outline-none focus:ring-2 focus:ring-primary/20 appearance-none disabled:opacity-80"
                >
                  <option value="Study">Study in Portugal</option>
                  <option value="Work">Work in Portugal</option>
                  <option value="Digital Nomad">Digital Nomad</option>
                  <option value="Retirement">Retirement</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Target City</label>
                <select 
                  disabled={!isEditing}
                  value={editData.city}
                  onChange={(e) => setEditData({...editData, city: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold text-ink outline-none focus:ring-2 focus:ring-primary/20 appearance-none disabled:opacity-80"
                >
                  <option value="Porto">Porto</option>
                  <option value="Lisbon">Lisbon</option>
                  <option value="Braga">Braga</option>
                  <option value="Coimbra">Coimbra</option>
                  <option value="Aveiro">Aveiro</option>
                  <option value="Faro">Faro</option>
                </select>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Settings Column */}
        <div className="space-y-8">
          {/* Preferences */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
            <h3 className="font-bold text-xl text-ink mb-8 flex items-center gap-2">
              <Settings className="text-gray-400" size={24} />
              Preferences
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">App Language</label>
                <div className="grid grid-cols-1 gap-2">
                  {['English', 'Portuguese', 'Spanish'].map(lang => (
                    <button 
                      key={lang}
                      onClick={() => isEditing && setEditData({...editData, language: lang as any})}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                        editData.language === lang 
                          ? 'bg-primary/5 border-primary text-primary font-bold' 
                          : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'
                      } ${!isEditing && 'cursor-default'}`}
                    >
                      <div className="flex items-center gap-3">
                        <Languages size={18} />
                        {lang}
                      </div>
                      {editData.language === lang && <Check size={18} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell size={18} className="text-accent" />
                    <span className="font-bold text-ink">Notifications</span>
                  </div>
                  <button className="w-12 h-7 bg-primary rounded-full relative transition-all shadow-inner">
                    <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-md"></div>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Account Actions */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft space-y-3">
            <button 
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl text-ink font-bold hover:bg-primary hover:text-white transition-all group border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <LogOut size={18} />
                Logout
              </div>
              <ChevronRight size={18} />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-transparent rounded-2xl text-gray-400 font-bold hover:text-red-500 transition-all">
              <div className="flex items-center gap-3 text-xs">
                <Trash2 size={14} />
                Delete Account
              </div>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, icon: Icon, isEditing, onChange, type = "text" }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1.5">
        <Icon size={12} />
        {label}
      </label>
      <div className={`p-4 rounded-2xl border transition-all ${isEditing ? 'bg-gray-50 border-primary/20' : 'bg-white border-teal-50 shadow-sm'}`}>
        {!isEditing ? (
          <p className="font-bold text-ink">{value || `Set ${label}`}</p>
        ) : (
          <input 
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent outline-none font-bold text-primary placeholder:text-gray-300"
            placeholder={`Enter ${label}...`}
          />
        )}
      </div>
    </div>
  );
}

