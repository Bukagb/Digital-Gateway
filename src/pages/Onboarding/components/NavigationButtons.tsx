import React from 'react';
import { ArrowRight } from 'lucide-react';

interface NavigationButtonProps {
  onClick: () => void;
  disabled?: boolean;
  text?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
}

export function NavigationButton({ 
  onClick, 
  disabled = false, 
  text = 'Continue',
  variant = 'primary',
  icon = <ArrowRight className="group-hover:translate-x-1 transition-transform" />
}: NavigationButtonProps) {
  
  const baseClasses = "w-full font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group";
  
  const variants = {
    primary: "bg-primary hover:bg-primary-dark disabled:bg-gray-200 text-white shadow-xl shadow-primary/20",
    secondary: "bg-ink hover:bg-ink/90 text-white shadow-xl",
    outline: "bg-white border border-gray-100 text-text-muted hover:bg-gray-50"
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {text}
      {icon}
    </button>
  );
}
