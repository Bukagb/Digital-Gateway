import React from 'react';
import { ExternalLink, Landmark, Globe, Train, GraduationCap, ChevronRight } from 'lucide-react';
import { Resource } from '../types';

interface ResourcesProps {
  resources: Resource[];
}

export default function Resources({ resources }: ResourcesProps) {
  const categories = Array.from(new Set(resources.map(r => r.category)));

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Government': return <Landmark size={24} />;
      case 'Transport': return <Train size={24} />;
      case 'Banking': return <Globe size={24} />;
      case 'Education': return <GraduationCap size={24} />;
      default: return <ExternalLink size={24} />;
    }
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto py-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-n-800 mb-2">Resources</h1>
        <p className="text-text-muted text-lg">Quick access to official platforms and helpful tools.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {categories.map((category) => (
          <div key={category} className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-3 text-text-main px-4">
              <span className="p-2 bg-primary-light rounded-xl text-primary">
                {getCategoryIcon(category)}
              </span>
              {category}
            </h2>
            <div className="space-y-4">
              {resources.filter(r => r.category === category).map((resource) => (
                <div key={resource.id} className="bg-white p-6 rounded-[2rem] border border-teal-50 shadow-soft hover:shadow-lg transition-all group">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{resource.title}</h3>
                  <p className="text-sm text-text-muted mb-6 leading-relaxed">{resource.description}</p>
                  <a 
                    href={resource.link}
                    target="_blank"
                    rel="no-referrer"
                    className="w-full bg-primary text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors shadow-lg shadow-primary/10"
                  >
                    Visit Official Site <ChevronRight size={18} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <section className="bg-white p-10 rounded-[3rem] border border-teal-100 shadow-soft flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-text-main mb-2">Wait, there's more!</h2>
          <p className="text-text-muted text-lg max-w-md">
            Need special help with language classes or healthcare enrollment?
          </p>
        </div>
        <button className="bg-primary text-white font-bold px-10 py-5 rounded-2xl shadow-2xl shadow-primary/30 relative z-10 hover:scale-105 transition-transform active:scale-95">
          Download PDF Guide
        </button>
      </section>
    </div>
  );
}
