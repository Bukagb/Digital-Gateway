import React from 'react';
import { motion } from 'motion/react';
import { StepProps } from '../types';
import { motivations } from '../constants';
import { NavigationButton } from '../components/NavigationButtons';

export function Step2Purpose(props: StepProps) {
  const { formData, updateForm, nextStep } = props;
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
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

      <NavigationButton 
        onClick={nextStep} 
        disabled={!formData.motivation} 
      />
    </motion.div>
  );
}
