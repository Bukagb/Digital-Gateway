import React, { useState, useEffect } from 'react';
import Sidebar, { PageId } from './components/Sidebar';
import TopNav from './components/TopNav';
import AIAssistant from './components/AIAssistant';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import MyJourney from './components/MyJourney';
import TaskDetail from './components/TaskDetail';
import Community from './components/Community';
import Jobs from './components/Jobs';
import Resources from './components/Resources';
import Profile from './components/Profile';
import Help from './components/Help';
import { UserProfile, Task, TaskStatus } from './types';
import { INITIAL_TASKS, JOBS, RESOURCES, COMMUNITY_GROUPS } from './constants';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : {
      name: '',
      nationality: '',
      university: '',
      arrivalDate: '',
      city: '',
      motivation: '',
      language: 'English',
      isOnboarded: false
    };
  });

  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    // Unlock logic
    const updatedTasks = tasks.map(task => {
      // Force unlock bank-account as requested
      if (task.id === 'bank-account' && task.status === 'Locked') {
        return { ...task, status: 'Not Started' as TaskStatus };
      }

      if (task.status === 'Locked' && task.dependsOn) {
        const dependenciesMet = task.dependsOn.every(depId => 
          tasks.find(t => t.id === depId)?.status === 'Completed'
        );
        if (dependenciesMet) {
          return { ...task, status: 'Not Started' as TaskStatus };
        }
      }
      return task;
    });
    
    if (JSON.stringify(updatedTasks) !== JSON.stringify(tasks)) {
      setTasks(updatedTasks);
    }
  }, [tasks]);

  const handleUpdateUser = (data: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...data }));
  };

  const handleCompleteOnboarding = (data: UserProfile) => {
    setUser(data);
    setCurrentPage('dashboard');
  };

  const handleUpdateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t));
  };

  const handleSelectTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setCurrentPage('task-detail');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('tasks');
    window.location.reload();
  };

  if (!user.isOnboarded) {
    return <Onboarding onComplete={handleCompleteOnboarding} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard 
            user={user} 
            tasks={tasks} 
            onNavigateToTask={handleSelectTask} 
            onNavigateToPage={setCurrentPage}
          />
        );
      case 'journey':
        return <MyJourney tasks={tasks} onSelectTask={handleSelectTask} />;
      case 'task-detail':
        return selectedTaskId ? (
          <TaskDetail 
            taskId={selectedTaskId} 
            tasks={tasks} 
            onBack={() => setCurrentPage('journey')}
            onUpdateStatus={handleUpdateTaskStatus}
          />
        ) : <MyJourney tasks={tasks} onSelectTask={handleSelectTask} />;
      case 'community':
        return <Community groups={COMMUNITY_GROUPS} user={user} />;
      case 'jobs':
        return <Jobs jobs={JOBS} user={user} />;
      case 'resources':
        return <Resources resources={RESOURCES} />;
      case 'profile':
      case 'settings':
        return <Profile user={user} onUpdateUser={handleUpdateUser} onLogout={handleLogout} />;
      case 'help':
        return <Help />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
             <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center text-primary">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
                </motion.div>
             </div>
             <h2 className="text-2xl font-bold">Page Under Development</h2>
             <p className="text-text-muted">We're working hard to bring this feature to life.</p>
             <button onClick={() => setCurrentPage('dashboard')} className="bg-primary text-white px-6 py-2 rounded-xl">Back to Dashboard</button>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        user={user} 
        onLogout={handleLogout}
      />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <TopNav user={user} onOpenProfile={() => setCurrentPage('profile')} />
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage + (selectedTaskId || '')}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <AIAssistant />
      </main>
    </div>
  );
}
