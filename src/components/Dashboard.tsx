import React from 'react';
import { 
  ArrowRight, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Lock,
  ArrowUpRight
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
  const lockedTasks = tasks.filter(t => t.status === 'Locked');

  return (
    <div className="space-y-10 max-w-6xl mx-auto py-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink">Welcome back, {user.name} 👋</h1>
          <p className="text-gray-500">You're on track for your move to {user.city || 'Portugal'}.</p>
        </div>
      </header>

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
            {tasks.slice(0, 3).map((task) => (
              <div 
                key={task.id} 
                onClick={() => task.status !== 'Locked' && onNavigateToTask(task.id)}
                className={`bg-white p-5 rounded-2xl border border-organic shadow-soft flex items-center gap-5 transition-all cursor-pointer hover:border-primary/20 ${task.status === 'Locked' ? 'opacity-50' : ''}`}
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
                  {task.status}
                </div>
              </div>
            ))}
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
