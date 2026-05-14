import React, { useState } from 'react';
import { Bell, Search, Globe, ChevronDown, Check, Clock, MessageSquare, Info } from 'lucide-react';
import { UserProfile } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import Logo from '../ui/Logo';

interface TopNavProps {
  user: UserProfile;
  onOpenProfile: () => void;
}

export default function TopNav({ user, onOpenProfile }: TopNavProps) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const languages = ['English', 'Portuguese', 'Spanish', 'French', 'German'];
  
  const notifications = [
    { id: 1, title: 'Welcome to Portugal!', message: 'Start your journey by setting up your NIF.', time: '2 mins ago', icon: Info, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 2, title: 'New Message', message: 'You have a message from the Community.', time: '1 hour ago', icon: MessageSquare, color: 'text-primary', bg: 'bg-primary/10' },
    { id: 3, title: 'Reminder', message: 'Don\'t forget your bank appointment.', time: '5 hours ago', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-teal-50 px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search for tasks, resources, or help..." 
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Language Selection */}
        <div className="relative">
          <div 
            onClick={() => {
              setIsLangOpen(!isLangOpen);
              setIsNotifOpen(false);
            }}
            className="flex items-center gap-2 text-text-muted hover:text-primary cursor-pointer transition-colors px-3 py-2 rounded-xl hover:bg-gray-50"
          >
            <Globe size={18} />
            <span className="text-sm font-bold">{user.language}</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
          </div>

          <AnimatePresence>
            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsLangOpen(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 z-20 py-2 overflow-hidden"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold hover:bg-gray-50 transition-colors text-ink text-left"
                      onClick={() => setIsLangOpen(false)}
                    >
                      {lang}
                      {user.language === lang && <Check size={14} className="text-primary" />}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsLangOpen(false);
            }}
            className={`relative p-2 text-text-muted hover:bg-gray-50 rounded-xl transition-colors ${isNotifOpen ? 'bg-gray-50 text-primary' : ''}`}
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
          </button>

          <AnimatePresence>
            {isNotifOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsNotifOpen(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-[2rem] shadow-2xl border border-gray-100 z-20 overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-50">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-ink">Notifications</h4>
                      <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-1 rounded-md uppercase tracking-widest">3 New</span>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="p-4 flex gap-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-none">
                        <div className={`w-10 h-10 rounded-xl ${notif.bg} ${notif.color} flex items-center justify-center shrink-0`}>
                          <notif.icon size={20} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-ink leading-tight">{notif.title}</p>
                          <p className="text-xs text-text-muted leading-snug">{notif.message}</p>
                          <p className="text-[10px] text-gray-400 font-medium">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-4 text-xs font-bold text-primary hover:bg-gray-50 transition-colors uppercase tracking-widest">
                    Mark all as read
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>

        <div 
          onClick={onOpenProfile}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="text-right hidden sm:block text-ink">
            <p className="text-sm font-bold group-hover:text-primary transition-colors text-text-main leading-tight">{user.name || 'User'}</p>
            <p className="text-[10px] text-text-muted uppercase tracking-wider font-black">{user.nationality || 'Traveler'}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-light border-2 border-primary/20 flex items-center justify-center overflow-hidden transition-all group-hover:scale-110 group-hover:border-primary">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name || 'default'}`} 
              alt="Avatar" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
