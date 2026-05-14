import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import Logo from '../../../components/ui/Logo';
import { ProgressBar } from './ProgressBar';

interface OnboardingLayoutProps {
  step: number;
  prevStep: () => void;
  children: React.ReactNode;
}

export function OnboardingLayout({ step, prevStep, children }: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      {/* LEFT SIDE (Visual Panel) */}
      <div className="hidden lg:block lg:w-1/2 relative bg-g-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=1600" 
          alt="Porto Riverside Architecture" 
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        />
        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-g-900/20"></div>
        
        <div className="absolute top-12 left-12">
          <Logo className="scale-100 origin-left" variant="white" />
        </div>

        <div className="absolute bottom-32 left-12 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight font-display leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)] whitespace-nowrap">
              Welcome to <span className="italic text-white">Digital Gateway</span>
            </h1>
            <p className="text-lg text-white/90 leading-relaxed font-display font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] whitespace-nowrap">
              Your all-in-one guide to settling in Portugal simplified, step by step.
            </p>
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE (Form Panel) */}
      <div className="w-full lg:w-1/2 flex flex-col items-center p-6 sm:p-12 md:p-24 bg-background relative overflow-y-auto">
        <div className="w-full max-w-lg mt-auto mb-auto">
          <div className="min-h-[140px] flex flex-col justify-between mb-8">
            <div className="h-12">
              {step > 1 && (
                <button 
                  onClick={prevStep}
                  className="p-3 rounded-2xl bg-white border border-gray-100 text-text-muted hover:text-primary transition-colors flex items-center gap-2 font-semibold shadow-sm"
                >
                  <ChevronLeft size={20} />
                  Back
                </button>
              )}
            </div>
            <ProgressBar step={step} />
          </div>

          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
