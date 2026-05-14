import React from 'react';
import { 
  ArrowRight, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Lock,
  ArrowUpRight,
  Home
} from 'lucide-react';
import { motion } from 'motion/react';
import { Task, UserProfile } from '../types';

interface DashboardProps {
  user: UserProfile;
  tasks: Task[];
  onNavigateToTask: (taskId: string) => void;
  onNavigateToPage: (pageId: any) => void;
}

export default function Dashboard({ user, tasks, onNavigateToTask, onNavigateToPage }: DashboardProps) {
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const progressPercent = Math.round((completedTasks / tasks.length) * 100);
  
  const nextTask = tasks.find(t => t.status === 'Not Started' || t.status === 'In Progress');
  
  // Logic for Housing Banner (Arrival within 1-3 months)
  const isArrivalSoon = React.useMemo(() => {
    if (!user.arrivalDate) return false;
    const arrival = new Date(user.arrivalDate);
    const now = new Date();
    const diffTime = arrival.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 90;
  }, [user.arrivalDate]);

  const hasVisa = user.visaStatus === 'Approved';

  const smartMatches = [
    ...(user.motivation === 'Study' ? [{ label: 'Same University', count: 12, icon: '🎓' }] : []),
    { label: 'Same Arrival Month', count: 45, icon: '📅' },
    { label: 'Same Nationality', count: 8, icon: '🌍' },
  ];

  return (
    <div className="space-y-10 w-full mx-auto py-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink">Welcome back, {user.name} 👋</h1>
          <p className="text-gray-500">You're on track for your move to {user.city || 'Portugal'}.</p>
        </div>
      </header>

      {/* Pre-arrival Banner - ONLY show if visa approved */}
      {hasVisa && (
        <section className="bg-[#122A21] text-white rounded-[2rem] p-8 relative overflow-hidden group shadow-2xl animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="absolute top-0 right-0 w-[500px] h-full bg-white/0.02 skew-x-[-15deg] translate-x-32 group-hover:translate-x-24 transition-transform duration-1000"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="flex-1">
               <div className="flex items-center gap-4 mb-4">
                 <span className="px-3 py-1 bg-[#007055] text-white text-[10px] font-black rounded-full uppercase tracking-widest">Pre-arrival Setup</span>
                 <span className="text-white/60 text-xs font-serif italic tracking-wide">Save time, reduce stress</span>
               </div>
               <h2 className="text-3xl font-bold mb-4 tracking-tight font-serif leading-tight">
                 Get everything ready before you arrive.
               </h2>
               <p className="text-white/60 text-sm max-w-xl leading-relaxed">
                 Don't wait until you land. Set up your <span className="text-white font-bold underline decoration-[#007055] decoration-2 underline-offset-4 cursor-pointer">NIF</span>, <span className="text-white font-bold underline decoration-[#007055] decoration-2 underline-offset-4 cursor-pointer">Bank Account</span>, and <span className="text-white font-bold underline decoration-[#007055] decoration-2 underline-offset-4 cursor-pointer">SIM Card</span> today through our Assisted Service flow.
               </p>
             </div>
             
             <div className="flex flex-col items-center gap-5 shrink-0">
                <button 
                  onClick={() => onNavigateToPage('journey')}
                  className="bg-white text-[#122A21] font-black px-7 py-3.5 rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 text-sm group/btn"
                >
                  Start Pre-arrival Setup <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
                
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {[
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
                      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
                    ].map((url, i) => (
                      <img key={i} src={url} className="w-7 h-7 rounded-full border-2 border-[#122A21] object-cover" />
                    ))}
                  </div>
                  <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">1,200+ students set up early</p>
                </div>
             </div>
          </div>
        </section>
      )}

      {/* Snapshot */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 bg-white rounded-[20px] shadow-soft border border-organic p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <div className="bg-accent-light text-accent px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 inline-block">
              NEXT ACTION REQUIRED
            </div>
            {nextTask ? (
              <>
                <h2 className="font-serif text-2xl font-bold mb-2 text-ink">{nextTask.title}</h2>
                <p className="text-sm text-gray-600 mb-6">{nextTask.description}</p>
                <div className="flex items-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {nextTask.timeEstimate}</span>
                  <span className="flex items-center gap-1.5"><AlertCircle size={14} /> LEVEL: {nextTask.difficulty}</span>
                </div>
              </>
            ) : (
              <h2 className="font-serif text-2xl font-bold mb-2 text-ink">Journey Complete!</h2>
            )}
          </div>
          <button 
            onClick={() => nextTask && onNavigateToTask(nextTask.id)}
            className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 shrink-0"
          >
            Continue Journey
          </button>
        </div>

        <div className="md:col-span-4 bg-white rounded-[20px] shadow-soft border border-organic p-8 text-center flex flex-col items-center justify-center">
          <div className="relative w-20 h-20 flex items-center justify-center mb-4">
             <svg className="w-full h-full -rotate-90">
               <circle cx="40" cy="40" r="36" fill="transparent" stroke="#E5E7EB" strokeWidth="6" />
               <circle cx="40" cy="40" r="36" fill="transparent" stroke="var(--color-primary)" strokeWidth="6" strokeDasharray={`${2 * Math.PI * 36}`} strokeDashoffset={`${2 * Math.PI * 36 * (1 - progressPercent / 100)}`} strokeLinecap="round" />
             </svg>
             <span className="absolute font-bold text-lg">{progressPercent}%</span>
          </div>
          <h3 className="font-serif font-bold text-ink">Journey Progress</h3>
          <p className="text-xs text-gray-500 mb-4">{completedTasks} of {tasks.length} tasks completed</p>
          <div className="w-full bg-gray-100 h-1.5 rounded-full">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              className="bg-primary h-full rounded-full"
            ></motion.div>
          </div>
        </div>
      </section>

      {/* Smart Matches */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-serif text-xl font-bold">Smart Matches for You</h3>
          <button onClick={() => onNavigateToPage('community')} className="text-sm text-primary font-bold hover:underline">View Community</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {smartMatches.map((match, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-soft flex items-center gap-4 group hover:border-primary/20 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {match.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-ink">{match.label}</p>
                <p className="text-xs text-gray-500">{match.count} members found</p>
              </div>
              <ArrowUpRight size={16} className="ml-auto text-gray-300 group-hover:text-primary transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* Housing Recommendation Card */}
      <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-[2.5rem] p-8 relative overflow-hidden group shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-6 right-8 bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm z-20">
            Housing
          </div>
          <div className="flex gap-8 items-center flex-1 relative z-10">
            <div className="w-20 h-20 bg-emerald-100/50 text-emerald-600 rounded-[2rem] flex items-center justify-center shadow-inner shrink-0 scale-110 border border-emerald-100">
              <Home size={40} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-ink mb-2">Find a place before you arrive</h3>
              <p className="text-emerald-800/60 text-base max-w-xl leading-relaxed font-medium">
                Secure your accommodation early and avoid last-minute stress. Browse verified listings suitable for your residence process.
              </p>
            </div>
          </div>
          <button 
            onClick={() => onNavigateToPage('housing')}
            className="bg-emerald-600 text-white font-bold px-10 py-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 shrink-0 flex items-center gap-3 group/btn relative z-10"
          >
            Explore Housing <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>

          {/* Decorative background elements */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl group-hover:bg-emerald-100/50 transition-colors" />
          <div className="absolute -left-10 -top-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-2xl" />
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-end px-2">
            <h3 className="font-serif text-xl font-bold">Current Task List</h3>
            <button onClick={() => onNavigateToPage('journey')} className="text-sm text-primary font-semibold underline underline-offset-4 cursor-pointer hover:text-primary-dark transition-colors">
              View all tasks
            </button>
          </div>
          
          <div className="space-y-4">
            {!hasVisa && (
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 animate-in fade-in slide-in-from-left-4">
                <AlertCircle size={20} className="text-amber-600 shrink-0" />
                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                  You’ll need a valid visa before applying for NIF or starting certain assisted services.
                </p>
              </div>
            )}
            {tasks.slice(0, 3).map((task) => {
              const isDisabled = !hasVisa && (task.id === 'nif' || task.id === 'bank-account');
              return (
                <div 
                  key={task.id} 
                  onClick={() => !isDisabled && task.status !== 'Locked' && onNavigateToTask(task.id)}
                  className={`bg-white p-5 rounded-2xl border border-organic shadow-soft flex items-center gap-5 transition-all cursor-pointer hover:border-primary/20 ${task.status === 'Locked' || isDisabled ? 'opacity-50 grayscale' : ''} ${isDisabled ? 'cursor-not-allowed' : ''}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                    task.status === 'Completed' ? 'bg-emerald-50' : 
                    task.status === 'In Progress' ? 'bg-orange-50 font-bold border-l-4 border-l-accent rounded-l-none' : 
                    'bg-gray-50'
                  }`}>
                    {task.icon === 'Phone' ? '📱' : task.icon === 'FileText' ? '📄' : task.icon === 'Landmark' ? '🏦' : '📝'}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-ink">{task.title}</div>
                    <div className="text-xs text-gray-500">{task.description}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                    task.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                    task.status === 'In Progress' ? 'bg-orange-50 text-accent' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {isDisabled ? 'Visa Required' : task.status}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
           <h3 className="font-serif text-xl font-bold px-2">Arrival Timeline</h3>
           <div className="bg-white rounded-[20px] shadow-soft border border-organic p-8 relative flex-1 min-h-[300px]">
              <div className="absolute left-10 top-12 bottom-12 w-0.5 bg-gray-100"></div>
              <div className="space-y-12">
                {[
                  { tag: 'BEFORE ARRIVAL', title: 'Documentation & Flights', status: 'Completed', color: 'primary' },
                  { tag: 'FIRST WEEK', title: 'You are here', status: 'In Progress', color: 'accent' },
                  { tag: 'FIRST MONTH', title: `Settling in ${user.city || 'Portugal'}`, status: 'Locked', color: 'gray-300' },
                ].map((item, idx) => (
                  <div key={idx} className="relative pl-12">
                    <div className={`absolute left-[-2px] top-1 w-5 h-5 rounded-full bg-white transition-all ${
                      item.status === 'Completed' ? 'border-4 border-primary' : 
                      item.status === 'In Progress' ? 'border-4 border-accent shadow-[0_0_0_4px_rgba(242,125,38,0.1)]' : 
                      'border-2 border-gray-200'
                    }`}></div>
                    <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
                      item.status === 'Completed' ? 'text-primary' : 
                      item.status === 'In Progress' ? 'text-accent' : 
                      'text-gray-400'
                    }`}>
                      {item.tag}
                    </div>
                    <div className={`text-sm ${item.status === 'In Progress' ? 'font-bold text-ink' : 'text-gray-500'}`}>
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-4 bg-primary rounded-xl text-white flex items-center gap-4 shadow-lg shadow-primary/20">
                <div className="text-2xl animate-bounce">💡</div>
                <div className="text-xs leading-relaxed">
                  Opening a bank account? Most students prefer <span className="font-bold underline decoration-white/40 underline-offset-2">Revolut</span> for immediate use.
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
