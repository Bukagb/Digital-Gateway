import React, { useState } from 'react';
import { 
  BarChart3, 
  Map, 
  Users, 
  Briefcase, 
  HelpCircle, 
  Settings, 
  ExternalLink,
  ChevronRight,
  User,
  LogOut,
  X,
  Home
} from 'lucide-react';
import Logo from '../ui/Logo';
import { motion, AnimatePresence } from 'motion/react';

import { UserProfile } from '../../types';

export type PageId = 'dashboard' | 'journey' | 'housing' | 'community' | 'resources' | 'jobs' | 'profile' | 'help' | 'task-detail' | 'settings';

interface SidebarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  user: UserProfile;
  onLogout: () => void;
}

export default function Sidebar({ currentPage, setCurrentPage, user, onLogout }: SidebarProps) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'journey', label: 'My Journey', icon: Map },
    { id: 'housing', label: 'Housing', icon: Home },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'resources', label: 'Resources', icon: ExternalLink },
  ];

  const secondaryItems = [
    { id: 'profile', label: 'Profile & Settings', icon: User },
    { id: 'help', label: 'Help / FAQ', icon: HelpCircle },
  ];

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  return (
    <div className="w-[240px] h-full bg-white border-r border-[#EEE9E0] flex flex-col py-8 z-40 relative">
      <Logo className="px-8 mb-10" />

      <nav className="mt-4 flex-1 space-y-1">
        <div className="px-4 mb-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-2">Main Menu</p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => setCurrentPage(item.id as PageId)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                currentPage === item.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-primary'
              }`}
            >
              <item.icon size={18} className={currentPage === item.id ? 'text-white' : 'text-gray-400 group-hover:text-primary'} />
              <span className="font-semibold text-sm">{item.label}</span>
              {currentPage === item.id && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        <div className="px-4 pt-4 border-t border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-2">Preferences</p>
          {secondaryItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => setCurrentPage(item.id as PageId)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                currentPage === item.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-primary'
              }`}
            >
              <item.icon size={18} className={currentPage === item.id ? 'text-white' : 'text-gray-400 group-hover:text-primary'} />
              <span className="font-semibold text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="px-4 mt-auto space-y-4">
        <button 
          onClick={handleLogoutClick}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all group"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold text-sm">Logout</span>
        </button>

        <div 
          onClick={() => setCurrentPage('profile')}
          className="p-4 bg-[#F8F6F2] rounded-[1.5rem] flex items-center gap-3 cursor-pointer hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
        >
          <div className="w-10 h-10 rounded-full bg-slate-300 border border-white shrink-0 overflow-hidden shadow-sm">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name || 'sarah'}`} alt="User" />
          </div>
          <div className="overflow-hidden">
            <div className="text-sm font-bold truncate leading-none mb-1 text-ink">{user.name || 'Guest User'}</div>
            <div className="text-[10px] text-gray-500 truncate font-medium uppercase tracking-tight">{user.nationality || 'Traveler'} • {user.city || 'Portugal' }</div>
          </div>
        </div>
      </div>

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
    </div>
  );
}
