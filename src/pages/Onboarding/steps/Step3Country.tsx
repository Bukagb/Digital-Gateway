import React from 'react';
import { motion } from 'motion/react';
import { Globe, Sparkles, ExternalLink } from 'lucide-react';
import { StepProps } from '../types';
import { countries, filteredCountries } from '../constants';
import { NavigationButton } from '../components/NavigationButtons';

export function Step3Country(props: StepProps) {
  const { formData, updateForm, nextStep, applyingFromQuery, setApplyingFromQuery } = props;
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
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
            value={applyingFromQuery || formData.applyingFromCountry || ''}
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

      <NavigationButton 
        onClick={nextStep} 
        disabled={!formData.applyingFromCountry} 
      />
    </motion.div>
  );
}
