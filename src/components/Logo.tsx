import React from 'react';

export default function Logo({ className = "", variant = "default" }: { className?: string, variant?: 'default' | 'white' }) {
  const isWhite = variant === 'white';
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative group">
        <div className={`absolute inset-0 ${isWhite ? 'bg-white/20' : 'bg-primary/20'} blur-lg group-hover:blur-xl transition-all rounded-full`} />
        <div className={`${isWhite ? 'bg-white' : 'bg-primary'} w-10 h-10 rounded-2xl flex items-center justify-center shadow-xl ${isWhite ? 'shadow-white/20' : 'shadow-primary/30'} transform transition-transform group-hover:scale-105`}>
          <span className={`${isWhite ? 'text-primary' : 'text-white'} font-black text-sm tracking-tighter`}>DG</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className={`font-sans text-xl font-black ${isWhite ? 'text-white' : 'text-ink'} tracking-tight flex items-center gap-1 leading-none`}>
          Digital <span className={isWhite ? 'text-white/80' : 'text-primary font-black'}>Gateway</span>
        </span>
      </div>
    </div>
  );
}
