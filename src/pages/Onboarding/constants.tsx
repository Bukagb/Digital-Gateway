import React from 'react';
import { 
  Plane, 
  BookOpen, 
  Briefcase, 
  Users, 
  CheckCircle2, 
  Hourglass, 
  FileText, 
  Map, 
  HelpCircle 
} from 'lucide-react';

export const countries = [
  "Nigeria", "Brazil", "India", "USA", "UK", "Canada", "Angola", "UAE", "Germany", "France", "Italy", "Spain", "Portugal", "Australia", "China", "Japan", "Ireland"
];

export const filteredCountries = (query: string) => 
  countries.filter(c => c.toLowerCase().includes(query.toLowerCase()));

export const motivations = [
  { id: 'Study', title: 'Study', desc: 'University, language school, or academic programs.', icon: <BookOpen size={24} /> },
  { id: 'Work', title: 'Work', desc: 'Employment, remote work, or career opportunities.', icon: <Briefcase size={24} /> },
  { id: 'Relocation', title: 'Relocation', desc: 'Long-term move or lifestyle relocation.', icon: <Plane size={24} /> },
  { id: 'Family', title: 'Family', desc: 'Joining or relocating with family.', icon: <Users size={24} /> }
];

export const visaStages = [
  { id: 'Approved', title: 'I already have my visa', desc: 'Continue with arrival preparation and settlement steps.', icon: <CheckCircle2 size={24} className="text-emerald-500" /> },
  { id: 'Applied', title: 'I already applied', desc: 'Track your preparation progress and prepare for arrival.', icon: <Hourglass size={24} className="text-amber-500" /> },
  { id: 'Preparing', title: 'I’m preparing documents', desc: 'Get document guidance and AI-assisted validation.', icon: <FileText size={24} className="text-blue-500" /> },
  { id: 'Not Started', title: 'I haven’t started yet', desc: 'We’ll help you understand requirements and next steps.', icon: <Map size={24} className="text-purple-500" /> },
  { id: 'Not Sure', title: 'I’m not sure which visa I need', desc: 'Answer a few questions and get personalized recommendations.', icon: <HelpCircle size={24} className="text-gray-500" /> }
];

export const documents = [
  { id: 'passport', title: 'Valid Passport', desc: 'Must be valid for at least 6 months.' },
  { id: 'admission', title: 'Admission Letter', desc: 'Official letter from your university.' },
  { id: 'criminal', title: 'Criminal Record', desc: 'Legalized record from your home country.' },
  { id: 'funds', title: 'Proof of Funds', desc: 'Bank statements showing sufficient balance.' },
  { id: 'insurance', title: 'Health Insurance', desc: 'Schengen-compliant health insurance.' }
];
