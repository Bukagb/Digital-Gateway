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
  Sparkles,
  AlertCircle,
  Clock,
  ExternalLink,
  ShieldCheck,
  FileSearch
} from 'lucide-react';
import Logo from './Logo';
import { UserProfile } from '../types';
import { VISA_DATA } from '../constants/visaData';

interface OnboardingProps {
  onComplete: (data: UserProfile) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '',
    gender: '',
    nationality: '',
    email: '',
    applyingFromCountry: '',
    visaStatus: '',
    visaStage: '',
    university: '',
    arrivalDate: '',
    city: '',
    motivation: '',
    language: 'English',
    isOnboarded: false,
    documentsReady: {},
    accommodationStatus: '',
    airportArrivalDetails: '',
    remoteWork: false,
    familyJoining: false,
    plannedStay: ''
  });

  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);
  const [aiReviewStarted, setAiReviewStarted] = useState(false);
  const [aiReviewCompleted, setAiReviewCompleted] = useState(false);
  const [matchingQuestionsStep, setMatchingQuestionsStep] = useState(0);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateForm = (data: Partial<UserProfile>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const countries = [
    "Nigeria", "Brazil", "India", "USA", "UK", "Canada", "Angola", "UAE", "Germany", "France", "Italy", "Spain", "Portugal", "Australia", "China", "Japan"
  ];

  const filteredCountries = (query: string) => 
    countries.filter(c => c.toLowerCase().includes(query.toLowerCase()));

  const [nationalityQuery, setNationalityQuery] = useState('');
  const [applyingFromQuery, setApplyingFromQuery] = useState('');

  const motivations = [
    { id: 'Study', title: 'Study', desc: 'University, language school, or academic programs.', icon: <BookOpen size={24} /> },
    { id: 'Work', title: 'Work', desc: 'Employment, remote work, or career opportunities.', icon: <Briefcase size={24} /> },
    { id: 'Relocation', title: 'Relocation', desc: 'Long-term move or lifestyle relocation.', icon: <Plane size={24} /> },
    { id: 'Family', title: 'Family', desc: 'Joining or relocating with family.', icon: <Users size={24} /> }
  ];

  const visaStages = [
    { id: 'Approved', title: 'I already have my visa', desc: 'Continue with arrival preparation and settlement steps.', icon: '✅' },
    { id: 'Applied', title: 'I already applied', desc: 'Track your preparation progress and prepare for arrival.', icon: '⏳' },
    { id: 'Preparing', title: 'I’m preparing documents', desc: 'Get document guidance and AI-assisted validation.', icon: '📄' },
    { id: 'Not Started', title: 'I haven’t started yet', desc: 'We’ll help you understand requirements and next steps.', icon: '🗺️' },
    { id: 'Not Sure', title: 'I’m not sure which visa I need', desc: 'Answer a few questions and get personalized recommendations.', icon: '❓' }
  ];

  const documents = [
    { id: 'passport', title: 'Valid Passport', desc: 'Must be valid for at least 6 months.' },
    { id: 'admission', title: 'Admission Letter', desc: 'Official letter from your university.' },
    { id: 'criminal', title: 'Criminal Record', desc: 'Legalized record from your home country.' },
    { id: 'funds', title: 'Proof of Funds', desc: 'Bank statements showing sufficient balance.' },
    { id: 'insurance', title: 'Health Insurance', desc: 'Schengen-compliant health insurance.' }
  ];

  const handleUpload = (id: string) => {
    if (!uploadedDocs.includes(id)) {
      setUploadedDocs(prev => [...prev, id]);
    }
  };

  const startAiReview = () => {
    setAiReviewStarted(true);
    setTimeout(() => {
      setAiReviewCompleted(true);
    }, 2000);
  };

  const getRecommendedVisa = () => {
    if (formData.motivation === 'Study') return VISA_DATA['Study'];
    if (formData.motivation === 'Work') return VISA_DATA['Work'];
    if (formData.motivation === 'Relocation') return VISA_DATA['Relocation'];
    if (formData.motivation === 'Family') return VISA_DATA['Family'];
    return VISA_DATA['Study']; // Default
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
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div className="space-y-1.5 relative">
                  <label className="text-sm font-semibold text-ink ml-1">Nationality</label>
                  <input 
                    type="text" 
                    placeholder="Search country..."
                    className="w-full bg-white border border-gray-200 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={nationalityQuery || formData.nationality}
                    onChange={(e) => {
                      setNationalityQuery(e.target.value);
                      updateForm({ nationality: e.target.value });
                    }}
                  />
                  {nationalityQuery && !countries.includes(nationalityQuery) && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg max-h-40 overflow-y-auto">
                      {filteredCountries(nationalityQuery).map(c => (
                        <button 
                          key={c}
                          className="w-full text-left px-4 py-2 hover:bg-primary/5 text-sm"
                          onClick={() => {
                            updateForm({ nationality: c });
                            setNationalityQuery('');
                          }}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
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

      case 2: // Purpose of Moving
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-lg space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-ink">What brings you to Portugal?</h3>
              <p className="text-text-muted">Help us personalize your journey.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {motivations.map(m => (
                <button 
                  key={m.id}
                  onClick={() => updateForm({ motivation: m.id as any })}
                  className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${formData.motivation === m.id ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 hover:border-primary/20 bg-white'}`}
                >
                  <div className={`p-3 rounded-xl ${formData.motivation === m.id ? 'bg-primary text-white' : 'bg-gray-50 text-text-muted'}`}>
                    {m.icon}
                  </div>
                  <div>
                    <p className="font-bold">{m.title}</p>
                    <p className="text-xs text-text-muted mt-0.5">{m.desc}</p>
                  </div>
                </button>
              ))}
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

      case 3: // Country Applying From
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-lg space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-ink">Which country will you apply from?</h3>
              <p className="text-text-muted">We’ll personalize your visa guidance and embassy updates based on your application country.</p>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <Globe size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search country..."
                  className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                  value={applyingFromQuery || formData.applyingFromCountry}
                  onChange={(e) => {
                    setApplyingFromQuery(e.target.value);
                    updateForm({ applyingFromCountry: e.target.value });
                  }}
                />
                {applyingFromQuery && !countries.includes(applyingFromQuery) && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl max-h-60 overflow-y-auto p-2">
                    {filteredCountries(applyingFromQuery).map(c => (
                      <button 
                        key={c}
                        className="w-full text-left px-4 py-3 hover:bg-primary/5 rounded-xl text-sm font-medium transition-colors"
                        onClick={() => {
                          updateForm({ applyingFromCountry: c });
                          setApplyingFromQuery('');
                        }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {formData.applyingFromCountry === 'Nigeria' && formData.motivation === 'Study' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 bg-amber-50 rounded-2xl border border-amber-200 space-y-3"
                >
                  <div className="flex items-center gap-2 text-amber-800">
                    <Sparkles size={18} className="text-amber-600" />
                    <span className="text-sm font-bold uppercase tracking-wider">Important Visa Update</span>
                  </div>
                  <p className="text-sm text-amber-800/80 leading-relaxed">
                    Student visa appointments from Nigeria are currently suspended by the Portuguese Embassy in Abuja until further notice.
                  </p>
                  <div className="flex gap-4">
                    <a 
                      href="https://abuja.embaixadaportugal.mne.gov.pt/en/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-amber-800 bg-white/50 px-4 py-2 rounded-lg border border-amber-200 hover:bg-white transition-colors flex items-center gap-2"
                    >
                      <ExternalLink size={14} />
                      Read Official Update
                    </a>
                  </div>
                </motion.div>
              )}
            </div>

            <button 
              onClick={nextStep}
              disabled={!formData.applyingFromCountry}
              className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-200 text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
            >
              Continue
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        );

      case 4: // Visa Stage
        if (formData.motivation === 'Study' && (formData.visaStage === 'Not Started' || formData.visaStage === 'Not Sure' || formData.visaStage === 'Preparing')) {
          // Skip matching for Study path
          setTimeout(() => setStep(5), 0);
          return null;
        }

        if (formData.visaStage === 'Not Sure' && matchingQuestionsStep < 3) {
          const questions = [
            { 
              q: "Are you employed remotely by a company outside Portugal?", 
              field: 'remoteWork',
              options: [{ l: 'Yes', v: true }, { l: 'No', v: false }]
            },
            { 
              q: "Will any family members be joining you in Portugal?", 
              field: 'familyJoining',
              options: [{ l: 'Yes', v: true }, { l: 'No', v: false }]
            },
            { 
              q: "What is your planned duration of stay?", 
              field: 'plannedStay',
              options: [{ l: 'Less than 1 year', v: 'short' }, { l: '1-2 years', v: 'medium' }, { l: 'Long term / Permanent', v: 'long' }]
            }
          ];
          const currQ = questions[matchingQuestionsStep];

          return (
            <motion.div 
              key={`match-q-${matchingQuestionsStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full max-w-lg space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
                  <Sparkles size={16} />
                  AI Visa Matching
                </div>
                <h3 className="text-2xl font-bold text-ink">{currQ.q}</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {currQ.options.map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      updateForm({ [currQ.field]: opt.v });
                      if (matchingQuestionsStep === 2) {
                        // Logic to potentially override motivation based on matching
                        if (opt.v === 'long' && formData.remoteWork) {
                          updateForm({ motivation: 'Relocation' as any });
                        }
                        setMatchingQuestionsStep(matchingQuestionsStep + 1);
                        nextStep();
                      } else {
                        setMatchingQuestionsStep(matchingQuestionsStep + 1);
                      }
                    }}
                    className="p-5 rounded-2xl border-2 text-left bg-white border-gray-100 hover:border-primary/20 transition-all font-bold text-ink flex items-center justify-between group"
                  >
                    {opt.l}
                    <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </button>
                ))}
              </div>
            </motion.div>
          );
        }

        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-lg space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-ink">What is your current visa stage?</h3>
              <p className="text-text-muted">Select the option that best describes your situation.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {visaStages.map(v => (
                <button 
                  key={v.id}
                  onClick={() => updateForm({ visaStage: v.id })}
                  className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${formData.visaStage === v.id ? 'border-primary bg-primary/5 text-primary shadow-sm' : 'border-gray-100 hover:border-primary/20 bg-white'}`}
                >
                  <div className="text-2xl w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl">
                    {v.icon}
                  </div>
                  <div>
                    <p className="font-bold">{v.title}</p>
                    <p className="text-xs text-text-muted mt-0.5">{v.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <button 
              onClick={() => {
                if (formData.visaStage === 'Not Sure') {
                  setMatchingQuestionsStep(0);
                } else {
                  nextStep();
                }
              }}
              disabled={!formData.visaStage}
              className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-200 text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
            >
              Continue
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        );

      case 5: // Branching Logic for Step 5
        const currentVisa = getRecommendedVisa();
        const isRecommendation = formData.visaStage === 'Not Started' || formData.visaStage === 'Not Sure' || formData.visaStage === 'Preparing';

        // Path A: Already have visa
        if (formData.visaStage === 'Approved') {
          return (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full max-w-lg space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-ink uppercase tracking-tight">Arrival Preparation</h2>
                <p className="text-text-muted">Tell us about your arrival plans to customize your settlement guide.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-ink ml-1">Expected Arrival Date</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="date" 
                      className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                      value={formData.arrivalDate}
                      onChange={(e) => updateForm({ arrivalDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-ink ml-1">City of Destination</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select 
                      className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none shadow-sm"
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
                </div>

                {formData.motivation === 'Study' && (
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-ink ml-1">University (Optional)</label>
                    <div className="relative">
                      <BookOpen size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Search your university..."
                        className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                        value={formData.university}
                        onChange={(e) => updateForm({ university: e.target.value })}
                      />
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={nextStep}
                disabled={!formData.arrivalDate || !formData.city}
                className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-200 text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
              >
                Continue to Settlement
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          );
        }

        // Path B: Already applied
        if (formData.visaStage === 'Applied') {
          return (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full max-w-lg space-y-8"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-ink">Application Support</h3>
                <p className="text-text-muted">What to do while waiting for your {currentVisa.id} visa approval.</p>
              </div>

              <div className="space-y-4">
                <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
                  <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-blue-900 text-sm">Estimated Waiting Period</p>
                    <p className="text-xs text-blue-800/80">{currentVisa.timeline}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold text-ink uppercase tracking-widest ml-1">While you wait</p>
                  {[
                    { t: 'Prepare Housing', d: 'Start looking at neighborhoods and housing documents.', i: <MapPin size={18} /> },
                    { t: 'Join Communities', d: 'Connect with other applicants from your country.', i: <Users size={18} /> },
                    { t: 'Learn about AIMA', d: 'Understand the mandatory biometrics process in Portugal.', i: <ShieldCheck size={18} /> }
                  ].map((act, i) => (
                    <div key={i} className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-text-muted italic">
                        {act.i}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-ink">{act.t}</p>
                        <p className="text-[10px] text-text-muted">{act.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={nextStep}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
              >
                Continue to Pre-Arrival
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          );
        }

        // Default Path: Education / Recommendation (for Preparing, Not Started, Not Sure)
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-lg space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-ink">
                {formData.motivation === 'Study' ? 'Recommended Visa Path' : 'Digital Gateway Recommendation'}
              </h3>
              <p className="text-text-muted">Based on your goals, here is the most suitable path for moving to Portugal.</p>
            </div>

            <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 space-y-4">
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Visa Category</p>
                <h4 className="text-2xl font-bold text-ink">{currentVisa.id} {currentVisa.name === 'D4 D4 Study Visa' ? 'D4 Study Visa' : currentVisa.name}</h4>
              </div>
              <ul className="space-y-2 text-sm text-text-muted">
                {currentVisa.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2"><span>•</span> {h}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold text-ink uppercase tracking-widest ml-1">Process Overview</p>
              <details className="group border border-gray-100 rounded-2xl overflow-hidden bg-white">
                <summary className="p-4 cursor-pointer font-bold text-sm flex justify-between items-center group-hover:bg-gray-50 transition-colors">
                  Processing Timeline
                  <ArrowRight size={16} className="group-open:rotate-90 transition-transform" />
                </summary>
                <div className="p-4 pt-0 text-sm text-text-muted border-t border-gray-100 leading-relaxed italic">
                  {currentVisa.timeline}
                </div>
              </details>

              <details className="group border border-gray-100 rounded-2xl overflow-hidden bg-white">
                <summary className="p-4 cursor-pointer font-bold text-sm flex justify-between items-center group-hover:bg-gray-50 transition-colors">
                  Required Documents ({currentVisa.requiredDocuments.length})
                  <ArrowRight size={16} className="group-open:rotate-90 transition-transform" />
                </summary>
                <div className="p-4 pt-0 text-sm text-text-muted border-t border-gray-100 divide-y divide-gray-50">
                  {currentVisa.requiredDocuments.map(doc => (
                    <div key={doc.id} className="py-3 space-y-1">
                      <p className="font-bold text-ink flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-primary" />
                        {doc.title}
                      </p>
                      <p className="text-xs leading-relaxed pl-6">{doc.explanation}</p>
                      {formData.applyingFromCountry === 'Nigeria' && (doc.id === 'criminal' || doc.id === 'legalized_docs' || doc.id === 'funds') && (
                        <div className="ml-6 mt-1 p-2 bg-amber-50 rounded-lg border border-amber-100">
                          <p className="text-[10px] font-bold text-amber-800 uppercase">Nigeria Guide</p>
                          <p className="text-[10px] text-amber-800/80">
                            {doc.id === 'criminal' && "You'll need a Police Character Certificate legalized at MFA Abuja."}
                            {doc.id === 'legalized_docs' && "Certificates require MFA authentication in Abuja. Nigeria is NOT Hague Apostille."}
                            {doc.id === 'funds' && "Embassy Expectation: ~€11k+ balance in accessible funds."}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </details>
            </div>

            <button 
              onClick={nextStep}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
            >
              Start Document Preparation
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        );

      case 6: // Branching Logic for Step 6
        // Path A: Already have visa (or Applied) -> Settlement Details
        if (formData.visaStage === 'Approved' || formData.visaStage === 'Applied') {
          if (formData.accommodationStatus === 'Searching' || formData.accommodationStatus === 'Need assistance') {
            return (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg space-y-8"
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-6">
                    <Globe size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-ink">Let’s help you find safe housing</h3>
                  <p className="text-text-muted">Browse verified student-friendly housing options in Portugal and secure your home before you land.</p>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={nextStep}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
                  >
                    Explore Housing
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={nextStep}
                    className="w-full bg-white border border-gray-100 text-text-muted font-bold py-4 rounded-2xl hover:bg-gray-50 transition-all"
                  >
                    Continue Later
                  </button>
                </div>
              </motion.div>
            );
          }

          return (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full max-w-lg space-y-8"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-ink">Settlement Details</h3>
                <p className="text-text-muted">Help us prepare your first few days in Portugal.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-ink ml-1">Accommodation Status</label>
                  <div className="grid grid-cols-1 gap-2">
                    {['Already secured', 'Still searching / Need assistance'].map(s => (
                      <button 
                        key={s}
                        onClick={() => updateForm({ accommodationStatus: s === 'Still searching / Need assistance' ? 'Searching' : s })}
                        className={`p-4 rounded-xl border text-left text-sm font-bold transition-all ${formData.accommodationStatus === (s === 'Still searching / Need assistance' ? 'Searching' : s) ? 'bg-primary/5 border-primary text-primary' : 'bg-white border-gray-100 text-text-muted hover:border-primary/20'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={nextStep}
                disabled={!formData.accommodationStatus}
                className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-200 text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
              >
                Continue
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          );
        }

        // Path B: AI Document Preparation (for others)
        const currentVisaForDocs = getRecommendedVisa();
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-lg space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-ink">Check your visa documents</h3>
              <p className="text-text-muted">Reduce common mistakes and improve your document readiness before your embassy appointment.</p>
            </div>

            {!aiReviewStarted ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-3">
                  {currentVisaForDocs.requiredDocuments.map(doc => (
                    <details key={doc.id} className="group border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:border-primary/10 transition-all">
                      <summary className="p-4 cursor-pointer flex items-center justify-between group-hover:bg-gray-50/50">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${uploadedDocs.includes(doc.id) ? 'bg-primary/10 text-primary' : 'bg-gray-50 text-gray-400'}`}>
                            {uploadedDocs.includes(doc.id) ? <CheckCircle2 size={20} /> : <FileSearch size={20} />}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-ink">{doc.title}</p>
                            <p className="text-[10px] text-text-muted uppercase tracking-wider">{doc.desc}</p>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            handleUpload(doc.id);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${uploadedDocs.includes(doc.id) ? 'bg-primary/5 text-primary' : 'bg-primary text-white hover:bg-primary-dark'}`}
                        >
                          {uploadedDocs.includes(doc.id) ? 'Uploaded' : 'Upload'}
                        </button>
                      </summary>
                      <div className="px-4 pb-4 space-y-3">
                        <div className="p-3 bg-gray-50 rounded-xl space-y-2">
                          <p className="text-xs text-ink font-bold">Requirements:</p>
                          <p className="text-xs text-text-muted leading-relaxed">{doc.explanation}</p>
                        </div>
                        {formData.applyingFromCountry === 'Nigeria' && doc.id === 'criminal' && (
                          <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                            <p className="text-[10px] font-bold text-amber-800 uppercase mb-1">Country-Specific Guidance (Nigeria)</p>
                            <p className="text-xs text-amber-800/80">Must be legalized at the Ministry of Foreign Affairs in Abuja before embassy submission.</p>
                          </div>
                        )}
                      </div>
                    </details>
                  ))}
                </div>

                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-primary">Readiness Score</p>
                    <p className="text-xl font-black text-ink">{Math.round((uploadedDocs.length / currentVisaForDocs.requiredDocuments.length) * 100)}%</p>
                  </div>
                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-1000" 
                      style={{ width: `${(uploadedDocs.length / currentVisaForDocs.requiredDocuments.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <button 
                  onClick={startAiReview}
                  disabled={uploadedDocs.length === 0}
                  className="w-full bg-ink text-white font-bold py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  <Sparkles size={20} className="text-primary-light" />
                  Run AI Preparation Check
                </button>
              </div>
            ) : !aiReviewCompleted ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <p className="font-bold text-ink">Analyzing documents...</p>
                <p className="text-sm text-text-muted">Our AI is checking for compliance and quality.</p>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="p-5 bg-white rounded-3xl border border-gray-100 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                    <h4 className="font-bold text-ink">AI Review Results</h4>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-bold uppercase tracking-wider">Analysis Complete</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-4 p-3 bg-green-50 rounded-xl">
                      <CheckCircle2 size={18} className="text-green-600 mt-0.5" />
                      <p className="text-sm text-green-800 font-medium">Passport valid for 12 months (Compliant)</p>
                    </div>
                    {currentVisaForDocs.requiredDocuments.find(d => d.id === 'criminal') && (
                      <div className="flex items-start gap-4 p-3 bg-amber-50 rounded-xl border border-amber-100">
                        <Sparkles size={18} className="text-amber-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-amber-800 font-bold">Action Required: Criminal Record</p>
                          <p className="text-xs text-amber-800/80">The document is missing the mandatory legalization stamp.</p>
                          <button 
                            onClick={() => {
                              const newUploaded = uploadedDocs.filter(id => id !== 'criminal');
                              setUploadedDocs(newUploaded);
                              setAiReviewStarted(false);
                              setAiReviewCompleted(false);
                            }}
                            className="mt-2 text-xs font-bold text-amber-900 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-amber-200"
                          >
                            Re-upload Document
                          </button>
                        </div>
                      </div>
                    )}
                    {currentVisaForDocs.requiredDocuments.find(d => d.id === 'insurance') && (
                      <div className="flex items-start gap-4 p-3 bg-red-50 rounded-xl border border-red-100">
                        <div className="w-4.5 h-4.5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5 text-red-600 text-[10px]">✕</div>
                        <div>
                          <p className="text-sm text-red-800 font-bold">Incorrect Coverage: Insurance</p>
                          <p className="text-xs text-red-800/80">Plan must explicitly state coverage for the entire Schengen area.</p>
                          <button 
                            onClick={() => {
                              const newUploaded = uploadedDocs.filter(id => id !== 'insurance');
                              setUploadedDocs(newUploaded);
                              setAiReviewStarted(false);
                              setAiReviewCompleted(false);
                            }}
                            className="mt-2 text-xs font-bold text-red-900 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-red-200"
                          >
                            Replace Insurance File
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 pt-2">
                  <button 
                    onClick={nextStep}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
                  >
                    Continue to Community Matching
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => onComplete({ ...formData, isOnboarded: true } as any)}
                      className="p-4 bg-white border border-gray-100 rounded-2xl text-center text-sm font-bold text-text-muted hover:bg-gray-50 transition-all"
                    >
                      Save Progress
                    </button>
                    <button 
                      onClick={() => onComplete({ ...formData, isOnboarded: true } as any)}
                      className="p-4 bg-white border border-gray-100 rounded-2xl text-center text-sm font-bold text-text-muted hover:bg-gray-50 transition-all"
                    >
                      Go to Dashboard
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        );

      case 7: // Community Matching & Next Steps
        const nationGroup = formData.nationality || 'your country';
        const arrivalGroup = formData.arrivalDate ? new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(new Date(formData.arrivalDate)) : 'Arriving Soon';
        const visaGroup = getRecommendedVisa().id;
        const isApproved = formData.visaStage === 'Approved';

        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-lg space-y-8"
          >
            <div className="space-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-bold text-ink">Ready to start your journey</h3>
              <p className="text-text-muted">We've matched you with communities and your first steps are ready.</p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-bold text-ink uppercase tracking-widest ml-1">Your Communities</p>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { name: `Students from ${nationGroup}`, count: 128 },
                  { name: `${visaGroup} Applicants 2026`, count: 450, hide: isApproved },
                  { name: `Arriving in ${formData.city || 'Portugal'}`, count: 120, hide: !formData.city },
                  { name: `Arriving ${arrivalGroup}`, count: 89, hide: !formData.arrivalDate },
                  { name: isApproved ? `Settling in ${formData.city || 'Portugal'}` : 'New Starters Hub', count: 340 }
                ].filter(g => !g.hide).map((group, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold">
                        {group.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-ink">{group.name}</p>
                        <p className="text-[10px] text-text-muted">{group.count} members active</p>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-primary hover:underline">Join</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <button 
                onClick={() => onComplete({ ...formData, isOnboarded: true } as any)}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-3xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
              >
                Go to Dashboard
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center text-xs text-text-muted leading-relaxed">
                By continuing, you agree to our terms and privacy policy. 
                AI documents reviews are for guidance purposes only.
              </p>
            </div>
          </motion.div>
        );


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
            {[1, 2, 3, 4, 5, 6, 7].map((it) => (
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
