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

// One slide per onboarding step (7 steps total) — paths verified against /public/image/
const CITY_SLIDES = [
  { src: '/image/lisboa.jpg',     city: 'Lisboa'    },
  { src: '/image/porto.avif',     city: 'Porto'     },
  { src: '/image/sintra.jpeg',    city: 'Sintra'    },
  { src: '/image/aveiro.jpg',     city: 'Aveiro'    },
  { src: '/image/algarve.jpeg',   city: 'Algarve'   },
  { src: '/image/guimaraes.jpeg', city: 'Guimarães' },
  { src: '/image/amarante.jpeg',  city: 'Amarante'  },
];

export function OnboardingLayout({ step, prevStep, children }: OnboardingLayoutProps) {
  const slideIndex = Math.min(step - 1, CITY_SLIDES.length - 1);
  const slide = CITY_SLIDES[slideIndex];

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      {/* LEFT SIDE (Visual Panel) */}
      <div className="hidden lg:block lg:w-1/2 relative bg-g-900 overflow-hidden">

        {/* Crossfade city images on each step change */}
        <AnimatePresence mode="sync">
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={`${slide.city}, Portugal`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.65, ease: 'easeInOut' }}
          />
        </AnimatePresence>

        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-g-900/10 pointer-events-none" />

        {/* Logo */}
        <div className="absolute top-12 left-12 z-10">
          <Logo className="scale-100 origin-left" variant="white" />
        </div>

        {/* Tagline */}
        <div className="absolute bottom-44 left-12 max-w-2xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight font-display leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)] whitespace-nowrap">
              Welcome to <span className="italic text-white">Digital Gateway</span>
            </h1>
            <p className="text-lg text-white/90 leading-relaxed font-display font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] whitespace-nowrap">
              Your all-in-one guide to settling in Portugal — simplified, step by step.
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
