import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { StepProps } from '../types';
import { visaStages } from '../constants';
import { NavigationButton } from '../components/NavigationButtons';

export function Step4VisaStage(props: StepProps) {
  const { formData, updateForm, nextStep, matchingQuestionsStep, setMatchingQuestionsStep, setStep } = props;
  
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
        exit={{ opacity: 0, x: -20 }}
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
              {opt.l as string}
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
      exit={{ opacity: 0, x: -20 }}
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

      <NavigationButton 
        onClick={() => {
          if (formData.visaStage === 'Not Sure') {
            setMatchingQuestionsStep(0);
          } else {
            nextStep();
          }
        }} 
        disabled={!formData.visaStage} 
      />
    </motion.div>
  );
}
