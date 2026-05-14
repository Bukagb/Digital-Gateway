import React from 'react';
import { motion } from 'motion/react';
import { Lock, Mail } from 'lucide-react';
import { StepProps } from '../types';
import { countries, filteredCountries } from '../constants';
import { NavigationButton } from '../components/NavigationButtons';

export function Step1AccountSetup(props: StepProps) {
  const { formData, updateForm, nextStep, nationalityQuery, setNationalityQuery } = props;
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
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
            value={formData.name || ''}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-ink ml-1">Gender</label>
            <select 
              className="w-full bg-white border border-gray-200 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
              value={formData.gender || ''}
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
              value={nationalityQuery || formData.nationality || ''}
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
              value={formData.email || ''}
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

      <NavigationButton 
        onClick={nextStep} 
        disabled={!formData.name || !formData.nationality || !formData.email} 
      />

      <p className="text-center text-sm text-text-muted">
        Already have an account? <button className="text-primary font-bold hover:underline">Log in</button>
      </p>
    </motion.div>
  );
}
