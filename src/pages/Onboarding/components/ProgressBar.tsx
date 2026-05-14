import React from 'react';

interface ProgressBarProps {
  step: number;
  totalSteps?: number;
}

export function ProgressBar({ step, totalSteps = 7 }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-2 mb-12">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((it) => (
        <div 
          key={it} 
          className={`h-1 rounded-full transition-all duration-500 flex-1 ${
            it === step ? 'bg-primary' : it < step ? 'bg-primary/40' : 'bg-gray-100'
          }`}
        />
      ))}
    </div>
  );
}
