import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ChevronLeft, 
  Plane, 
  BookOpen, 
  Briefcase, 
  Users, 
  Globe, 
  Mail, 
  Lock,
  CheckCircle2,
  MapPin,
  Calendar,
  Sparkles
} from 'lucide-react';
import Logo from './Logo';
import { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (data: UserProfile) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile & { gender: string, email: string, visaStatus: string }>>({
    name: '',
    gender: '',
    nationality: '',
    email: '',
    visaStatus: '',
    university: '',
    arrivalDate: '',
    city: '',
    motivation: '',
    language: 'English',
    isOnboarded: false
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateForm = (data: Partial<UserProfile & { gender: string, email: string, visaStatus: string }>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (step) {
      case 1: // Account Setup
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-lg space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-ink">Account Setup</h2>
              <p className="text-text-muted">Let's get started with your basic information.</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-ink ml-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-white border border-gray-200 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={formData.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-ink ml-1">Gender</label>
                  <select 
                    className="w-full bg-white border border-gray-200 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                    value={formData.gender}
                    onChange={(e) => updateForm({ gender: e.target.value })}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-ink ml-1">Nationality</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Brazil"
                    className="w-full bg-white border border-gray-200 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={formData.nationality}
                    onChange={(e) => updateForm({ nationality: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-ink ml-1">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="email" 
                    placeholder="email@example.com"
                    className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={formData.email}
                    onChange={(e) => updateForm({ email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-ink ml-1">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={nextStep}
              disabled={!formData.name || !formData.nationality || !formData.email}
              className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-200 text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
            >
              Continue
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-center text-sm text-text-muted">
              Already have an account? <button className="text-primary font-bold hover:underline">Log in</button>
            </p>
          </motion.div>
        );

      case 2: // What brings you to Portugal?
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-lg space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-ink">What brings you to Portugal?</h3>
              <div className="grid grid-cols-3 gap-3">
                {['Study', 'Work', 'Relocation'].map(m => (
                  <button 
                    key={m}
                    onClick={() => updateForm({ motivation: m as any })}
                    className={`p-4 rounded-2xl border-2 font-bold transition-all h-24 flex items-center justify-center text-center ${formData.motivation === m ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 hover:border-primary/20'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={nextStep}
              disabled={!formData.motivation}
              className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-200 text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
            >
              Continue
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        );

      case 3: // What is your visa status?
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-lg space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-ink">What is your visa status?</h3>
              <div className="space-y-3">
                {[
                  { id: 'Approved', label: 'I already have my visa ✅' },
                  { id: 'In process', label: 'I’m in the process' },
                  { id: 'Not started', label: 'I haven’t started yet / not sure' }
                ].map(v => (
                  <button 
                    key={v.id}
                    onClick={() => updateForm({ visaStatus: v.id })}
                    className={`w-full p-6 rounded-2xl border-2 font-bold text-left transition-all flex items-center justify-between ${formData.visaStatus === v.id ? 'border-primary bg-primary/5 text-primary shadow-sm' : 'border-gray-100 hover:border-primary/20'}`}
                  >
                    {v.label}
                    {formData.visaStatus === v.id && <CheckCircle2 size={24} className="text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={nextStep}
              disabled={!formData.visaStatus}
              className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-200 text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
            >
              Continue
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        );

      case 4: // Conditional Step
        if (formData.visaStatus === 'Approved') {
          return (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full max-w-lg space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-ink">Trip Details</h2>
                <p className="text-text-muted">Tell us about your arrival plans.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-ink ml-1">Expected Arrival Date</label>
                  <input 
                    type="date" 
                    className="w-full bg-white border border-gray-200 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={formData.arrivalDate}
                    onChange={(e) => updateForm({ arrivalDate: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-ink ml-1">City of Destination</label>
                  <select 
                    className="w-full bg-white border border-gray-200 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                    value={formData.city}
                    onChange={(e) => updateForm({ city: e.target.value })}
                  >
                    <option value="">Select City</option>
                    <option value="Lisbon">Lisbon</option>
                    <option value="Porto">Porto</option>
                    <option value="Coimbra">Coimbra</option>
                    <option value="Braga">Braga</option>
                    <option value="Faro">Faro</option>
                  </select>
                </div>

                {formData.motivation === 'Study' && (
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-ink ml-1">University (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="Search your university..."
                      className="w-full bg-white border border-gray-200 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      value={formData.university}
                      onChange={(e) => updateForm({ university: e.target.value })}
                    />
                  </div>
                )}
              </div>

              <button 
                onClick={() => onComplete({ ...formData, isOnboarded: true } as any)}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
              >
                Finish Setup
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          );
        } else {
          return (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full max-w-lg space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-ink">Let’s help you get started</h2>
                <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
                  <p className="text-sm font-bold text-primary uppercase tracking-widest mb-1">Recommended Visa</p>
                  <p className="text-lg font-bold text-ink">{formData.motivation === 'Study' ? 'D4 Study Visa' : formData.motivation === 'Work' ? 'D1 Work Visa' : 'D7 Relocation Visa'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-bold text-ink uppercase tracking-widest">Key Documents Checklist</p>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { title: 'Valid Passport', desc: 'Must be valid for 6+ months', icon: '🛂' },
                    { title: 'Criminal Record', desc: 'Apostilled within 3 months', icon: '📝' },
                    { title: 'Proof of Funds', desc: 'Sufficient financial means', icon: '💰' },
                    { title: 'Health Insurance', desc: 'EU-valid private insurance', icon: '🏥' }
                  ].map(item => (
                    <div key={item.title} className="flex items-center gap-4 p-5 bg-white rounded-3xl border border-gray-100 shadow-sm hover:border-primary/20 transition-all">
                      <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-xl">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-ink">{item.title}</p>
                        <p className="text-[10px] text-text-muted uppercase tracking-wider">{item.desc}</p>
                      </div>
                      <div className="w-6 h-6 rounded-full border-2 border-gray-100 flex items-center justify-center shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-100"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-xs font-bold text-blue-800 mb-1">💡 Preparation Tip</p>
                <p className="text-xs text-blue-700 leading-relaxed">
                  Start gathering your criminal record certificate early, as it often requires apostille and can take 2-4 weeks.
                </p>
              </div>

              <button 
                onClick={() => onComplete({ ...formData, isOnboarded: true } as any)}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
              >
                Start My Visa Preparation
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          );
        }

      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      {/* LEFT SIDE (Visual Panel) */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[#122A21] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=1600" 
          alt="Porto Riverside Architecture" 
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        />
        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-[#122A21]/20"></div>
        
        <div className="absolute top-12 left-12">
          <Logo className="scale-100 origin-left" variant="white" />
        </div>

        <div className="absolute bottom-32 left-12 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight font-serif leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)] whitespace-nowrap">
              Welcome to <span className="italic text-white">Digital Gateway</span>
            </h1>
            <p className="text-lg text-white/90 leading-relaxed font-serif font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] whitespace-nowrap">
              Your all-in-one guide to settling in Portugal simplified, step by step.
            </p>
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE (Form Panel) */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 md:p-24 bg-background relative">
        {step > 1 && (
          <button 
            onClick={prevStep}
            className="absolute top-12 left-12 p-3 rounded-2xl bg-white border border-gray-100 text-text-muted hover:text-primary transition-colors flex items-center gap-2 font-semibold shadow-sm"
          >
            <ChevronLeft size={20} />
            Back
          </button>
        )}

        <div className="w-full max-w-lg">
          <div className="flex items-center gap-2 mb-12">
            {[1, 2, 3, 4].map((it) => (
              <div 
                key={it} 
                className={`h-1 rounded-full transition-all duration-500 flex-1 ${
                  it === step ? 'bg-primary' : it < step ? 'bg-primary/40' : 'bg-gray-100'
                }`}
              ></div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
