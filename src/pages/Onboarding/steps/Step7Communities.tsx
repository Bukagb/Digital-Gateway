import React from 'react';
import { motion } from 'motion/react';
import { Users } from 'lucide-react';
import { StepProps } from '../types';
import { NavigationButton } from '../components/NavigationButtons';

export function Step7Communities(props: StepProps) {
  const { formData, onComplete, getRecommendedVisa } = props;

  const nationGroup = formData.nationality || 'your country';
  const arrivalGroup = formData.arrivalDate ? new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(new Date(formData.arrivalDate)) : 'Arriving Soon';
  const visaGroup = getRecommendedVisa().id;
  const isApproved = formData.visaStage === 'Approved';

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
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
        <NavigationButton 
          onClick={() => onComplete({ ...formData, isOnboarded: true } as any)} 
          text="Go to Dashboard"
        />
        <p className="text-center text-xs text-text-muted leading-relaxed">
          By continuing, you agree to our terms and privacy policy. 
          AI documents reviews are for guidance purposes only.
        </p>
      </div>
    </motion.div>
  );
}
