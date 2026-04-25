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
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '',
    nationality: '',
    university: '',
    arrivalDate: '',
    city: '',
    motivation: '',
    language: 'English',
    isOnboarded: false
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateForm = (data: Partial<UserProfile>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const motivations = [
    { id: 'Study', icon: BookOpen, label: 'Study', color: 'bg-blue-50 text-blue-600' },
    { id: 'Work', icon: Briefcase, label: 'Work', color: 'bg-emerald-50 text-emerald-600' },
    { id: 'Family', icon: Users, label: 'Family', color: 'bg-orange-50 text-orange-600' },
    { id: 'Other', icon: Sparkles, label: 'Other', color: 'bg-purple-50 text-purple-600' },
  ];

  const languages = [
    { id: 'English', label: 'English', flag: '🇬🇧' },
    { id: 'Portuguese', label: 'Portuguese', flag: '🇵🇹' },
    { id: 'Spanish', label: 'Spanish', flag: '🇪🇸' },
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <Logo className="justify-center mb-8 scale-150" />
            <h1 className="font-serif text-4xl font-bold text-ink mb-4 tracking-tight leading-tight">
              Your step-by-step guide to settling in Portugal
            </h1>
            <p className="text-gray-500 mb-10 text-lg">
              Everything you need. In the right order. No confusion.
            </p>
            <div className="relative mb-12">
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <div className="w-64 h-64 bg-primary-light rounded-full blur-3xl opacity-50"></div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=400" 
                alt="Portugal Street" 
                className="w-full h-56 object-cover rounded-[20px] shadow-2xl border-4 border-white"
                style={{ imageRendering: 'auto' }}
              />
            </div>
            <button 
              onClick={nextStep}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group text-lg"
            >
              Get Started
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        );

      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-lg"
          >
            <h2 className="text-3xl font-bold mb-2">Why are you moving to Portugal?</h2>
            <p className="text-text-muted mb-8 text-lg">We'll tailor your journey based on your goal.</p>
            <div className="grid grid-cols-2 gap-4 mb-10">
              {motivations.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    updateForm({ motivation: m.id });
                    nextStep();
                  }}
                  className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 group bg-white shadow-sm h-40 justify-center ${
                    formData.motivation === m.id ? 'border-primary bg-primary-light/20' : 'border-gray-100 hover:border-primary-light hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-4 rounded-2xl ${m.color} group-hover:scale-110 transition-transform`}>
                    <m.icon size={28} />
                  </div>
                  <span className="font-semibold text-text-main">{m.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-lg"
          >
            <h2 className="text-3xl font-bold mb-2">Tell us about yourself</h2>
            <p className="text-text-muted mb-8 text-lg">Help us customize your relocation checklist.</p>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-main ml-1">Full Name</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Users size={18} /></span>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base"
                    value={formData.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-main ml-1">Nationality</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Globe size={18} /></span>
                    <input 
                      type="text" 
                      placeholder="e.g. Brazil"
                      className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base"
                      value={formData.nationality}
                      onChange={(e) => updateForm({ nationality: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-main ml-1">Arrival Date</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Calendar size={18} /></span>
                    <input 
                      type="date" 
                      className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base"
                      value={formData.arrivalDate}
                      onChange={(e) => updateForm({ arrivalDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-main ml-1">Preferred City</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><MapPin size={18} /></span>
                    <select 
                      className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base appearance-none"
                      value={formData.city}
                      onChange={(e) => updateForm({ city: e.target.value })}
                    >
                      <option value="">Select City</option>
                      <option value="Porto">Porto</option>
                      <option value="Lisbon">Lisbon</option>
                      <option value="Coimbra">Coimbra</option>
                      <option value="Braga">Braga</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-main ml-1">University</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><BookOpen size={18} /></span>
                    <input 
                      type="text" 
                      placeholder="e.g. U.Porto"
                      className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base"
                      value={formData.university}
                      onChange={(e) => updateForm({ university: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button 
              onClick={nextStep}
              disabled={!formData.name || !formData.nationality}
              className="w-full mt-10 bg-primary hover:bg-primary-dark disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group text-lg"
            >
              Continue
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        );

      case 4:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-lg"
          >
            <h2 className="text-3xl font-bold mb-2">Language preference</h2>
            <p className="text-text-muted mb-8 text-lg">We'll provide resources in your preferred language.</p>
            <div className="space-y-3 mb-10">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => updateForm({ language: lang.id as any })}
                  className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center gap-4 bg-white hover:bg-gray-50 h-20 ${
                    formData.language === lang.id ? 'border-primary bg-primary-light/10' : 'border-gray-100'
                  }`}
                >
                  <span className="text-3xl">{lang.flag}</span>
                  <span className={`font-semibold text-lg ${formData.language === lang.id ? 'text-primary' : 'text-text-main'}`}>
                    {lang.label}
                  </span>
                  {formData.language === lang.id && <CheckCircle2 className="ml-auto text-primary" size={24} />}
                </button>
              ))}
            </div>
            <button 
              onClick={nextStep}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group text-lg"
            >
              Continue
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        );

      case 5:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-lg"
          >
            <h2 className="text-3xl font-bold mb-2">Create your account</h2>
            <p className="text-text-muted mb-8 text-lg">Secure your personalized relocation plan.</p>
            <div className="space-y-4 mb-6">
              <button className="w-full py-4 border-2 border-gray-100 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors font-semibold shadow-sm">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                Continue with Google
              </button>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="flex-1 h-[1px] bg-gray-200"></div>
                <span className="text-sm font-medium text-text-muted">or use email</span>
                <div className="flex-1 h-[1px] bg-gray-200"></div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Mail size={18} /></span>
                  <input type="email" placeholder="email@example.com" className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Lock size={18} /></span>
                  <input type="password" placeholder="Password" className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                </div>
              </div>
            </div>
            <button 
              onClick={nextStep}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group text-lg"
            >
              Finish Setup
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        );

      case 6:
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg text-center"
          >
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/20">
              <Sparkles className="text-white" size={40} />
            </div>
            <h2 className="font-serif text-3xl font-bold mb-4 text-ink">Your relocation plan is ready!</h2>
            <p className="text-gray-500 mb-8 text-lg">We've identified 7 key tasks for your move to {formData.city || 'Portugal'}.</p>
            
            <div className="bg-white rounded-[20px] border border-organic shadow-soft p-8 text-left mb-10 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
              <h3 className="font-serif font-bold text-lg mb-6 flex items-center gap-2 text-ink">
                <ChevronLeft size={20} className="rotate-180" /> Top priority steps:
              </h3>
              <div className="space-y-6">
                {[
                  { step: 1, title: 'Get phone number', desc: 'Required for communication & apps' },
                  { step: 2, title: 'Get NIF', desc: 'Your essential tax identification' },
                  { step: 3, title: 'Open bank account', desc: 'Secure your finances locally' }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center text-primary font-bold shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-ink">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => onComplete({ ...formData, isOnboarded: true } as UserProfile)}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-xl shadow-primary/30 transition-all flex items-center justify-center gap-2 group text-lg"
            >
              Go to Dashboard
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        );

      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] -z-10"></div>

      {step > 1 && step < 6 && (
        <button 
          onClick={prevStep}
          className="absolute top-8 left-8 p-3 rounded-2xl bg-white border border-gray-100 text-text-muted hover:text-primary transition-colors flex items-center gap-2 font-semibold shadow-sm"
        >
          <ChevronLeft size={20} />
          Back
        </button>
      )}

      {step > 1 && (
        <div className="absolute top-8 right-8 flex items-center gap-2">
          {[1, 2, 3, 4, 5, 6].map((it) => (
            <div 
              key={it} 
              className={`h-2 rounded-full transition-all duration-500 ${
                it === step ? 'w-8 bg-primary' : it < step ? 'w-2 bg-primary/40' : 'w-2 bg-gray-200'
              }`}
            ></div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
    </div>
  );
}
