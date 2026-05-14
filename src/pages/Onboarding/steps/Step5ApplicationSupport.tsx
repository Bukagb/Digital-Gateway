import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Users, CheckCircle2, MapPin, Calendar, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { StepProps } from '../types';
import { NavigationButton } from '../components/NavigationButtons';

export function Step5ApplicationSupport(props: StepProps) {
  const { formData, updateForm, nextStep, getRecommendedVisa } = props;
  const currentVisa = getRecommendedVisa();

  // Path A: Already have visa
  if (formData.visaStage === 'Approved') {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
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
                value={formData.arrivalDate || ''}
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
                value={formData.city || ''}
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
                  value={formData.university || ''}
                  onChange={(e) => updateForm({ university: e.target.value })}
                />
              </div>
            </div>
          )}
        </div>

        <NavigationButton 
          onClick={nextStep} 
          disabled={!formData.arrivalDate || !formData.city} 
          text="Continue to Settlement"
        />
      </motion.div>
    );
  }

  // Path B: Already applied
  if (formData.visaStage === 'Applied') {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
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

        <NavigationButton 
          onClick={nextStep} 
          text="Continue to Pre-Arrival"
        />
      </motion.div>
    );
  }

  // Default Path: Education / Recommendation
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
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
          <h4 className="text-2xl font-bold text-ink">{currentVisa.id} {currentVisa.name}</h4>
        </div>
        <ul className="space-y-2 text-sm text-text-muted">
          {currentVisa.highlights.map((h: string, i: number) => (
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
            {currentVisa.requiredDocuments.map((doc: any) => (
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

      <NavigationButton 
        onClick={nextStep} 
        text="Start Document Preparation"
      />
    </motion.div>
  );
}
