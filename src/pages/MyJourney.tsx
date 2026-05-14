import React from 'react';
import { 
  Phone, 
  FileText, 
  Landmark, 
  Train, 
  Calendar, 
  HeartPulse, 
  Languages, 
  Clock, 
  AlertCircle,
  ChevronRight,
  Home,
  Flag
} from 'lucide-react';
import { motion } from 'motion/react';
import { Task, TaskStatus } from '../types';

const ICON_MAP: Record<string, any> = {
  Phone,
  FileText,
  Landmark,
  Train,
  Calendar,
  HeartPulse,
  Languages,
  Home,
  Flag
};

interface MyJourneyProps {
  tasks: Task[];
  onSelectTask: (taskId: string) => void;
}

export default function MyJourney({ tasks, onSelectTask }: MyJourneyProps) {
  const categories: Task['category'][] = ['Before Arrival', 'First Week', 'First Month', 'Ongoing'];

  const getStatusStyle = (status: TaskStatus) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'In Progress': return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'Locked': return 'bg-gray-50 text-gray-400 border-gray-100';
      default: return 'bg-teal-50 text-primary border-teal-100';
    }
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-text-main mb-2">My Journey</h1>
          <p className="text-text-muted text-lg">Follow the path to a smooth life in Portugal.</p>
        </div>
        <div className="flex gap-2">
          {['All', 'Essential', 'Optional'].map(filter => (
            <button key={filter} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              filter === 'All' ? 'bg-primary text-white' : 'bg-white text-text-muted hover:bg-teal-50'
            }`}>
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-16">
        {categories.map((category) => (
          <section key={category} className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-0.5 flex-1 bg-teal-50"></div>
              <h2 className="text-xl font-bold bg-white px-6 py-2 rounded-full border border-teal-50 text-primary shadow-sm uppercase tracking-widest text-xs">
                {category}
              </h2>
              <div className="h-0.5 flex-1 bg-teal-50"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.filter(t => t.category === category).map((task) => {
                const Icon = ICON_MAP[task.icon] || FileText;
                return (
                  <motion.div
                    key={task.id}
                    whileHover={task.status !== 'Locked' ? { y: -8, scale: 1.02 } : {}}
                    whileTap={task.status !== 'Locked' ? { scale: 0.98 } : {}}
                    onClick={() => task.status !== 'Locked' && onSelectTask(task.id)}
                    className={`p-6 rounded-[2.5rem] bg-white border border-teal-50 shadow-soft transition-all cursor-pointer relative group overflow-hidden ${
                      task.status === 'Locked' ? 'opacity-60 cursor-not-allowed filter grayscale-[0.2]' : 'hover:border-primary/50'
                    }`}
                  >
                    {task.status === 'Locked' && (
                      <div className="absolute top-4 right-6 text-gray-300">
                        <AlertCircle size={24} />
                      </div>
                    )}
                    
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-6 ${
                      task.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
                      task.status === 'In Progress' ? 'bg-orange-50 text-orange-600' : 
                      'bg-teal-50 text-primary'
                    }`}>
                      <Icon size={28} />
                    </div>

                    <div className={`inline-block px-3 py-1 rounded-lg text-[10px] font-bold border mb-4 ${getStatusStyle(task.status)}`}>
                      {task.status.toUpperCase()}
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{task.title}</h3>
                    <p className="text-sm text-text-muted mb-6 line-clamp-2">
                      {task.description}
                    </p>

                    <div className="flex items-center gap-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-primary/60" />
                        {task.timeEstimate}
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertCircle size={14} className="text-primary/60" />
                        {task.difficulty}
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                      <span className="text-primary font-bold text-sm">View Details</span>
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
