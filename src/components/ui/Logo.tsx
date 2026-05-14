import React from 'react';

export default function Logo({ className = "", variant = "default" }: { className?: string, variant?: 'default' | 'white' | 'green' }) {
  const isWhite = variant === 'white';
  const isGreen = variant === 'green';
  
  // Default to green if not specified as white? 
  // User said "the logo in the dashboard should be green". 
  // The sidebar is usually where the logo is in the dashboard.
  
  const colorClass = isWhite ? 'bg-white' : isGreen ? 'bg-g-600' : 'bg-g-800';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div 
        className={`h-16 w-[240px] ${colorClass} transition-colors`}
        style={{ 
          WebkitMaskImage: 'url(/dg-logo.png)', 
          WebkitMaskSize: 'contain', 
          WebkitMaskRepeat: 'no-repeat', 
          WebkitMaskPosition: 'left center',
          maskImage: 'url(/dg-logo.png)', 
          maskSize: 'contain', 
          maskRepeat: 'no-repeat', 
          maskPosition: 'left center'
        }} 
        aria-label="Digital Gateway Logo"
      />
    </div>
  );
}
