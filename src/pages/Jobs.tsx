import React from 'react';
import { Briefcase, MapPin, Search, ExternalLink, AlertCircle, Info } from 'lucide-react';
import { Job, UserProfile } from '../types';

interface JobsProps {
  jobs: Job[];
  user: UserProfile;
}

export default function Jobs({ jobs: initialJobs, user }: JobsProps) {
  // Update job locations to match user city
  const jobs = initialJobs.map(job => ({
    ...job,
    location: job.location.includes('Lisbon') && user.city === 'Porto' 
      ? job.location.replace('Lisbon', 'Porto') 
      : job.location.includes('Porto') && user.city === 'Lisbon'
      ? job.location.replace('Porto', 'Lisbon')
      : job.location
  }));

  return (
    <div className="space-y-10 max-w-6xl mx-auto py-6">
      <div>
        <h1 className="text-4xl font-extrabold text-text-main mb-2">Part-time Jobs</h1>
        <p className="text-text-muted text-lg">Opportunities for students (max 20h/week during semesters).</p>
      </div>

      <div className="bg-orange-50 border border-orange-100 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-accent shadow-sm shrink-0">
          <Info size={32} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-orange-900 mb-1">Before you apply...</h3>
          <p className="text-orange-800 leading-relaxed text-sm">
            Remember that you need your <strong>NIF</strong> and a <strong>Portuguese bank account</strong> to sign any labor contract. Check your journey status before applying to avoid delays.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-teal-50 shadow-soft">
            <h4 className="font-bold mb-4">Filters</h4>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-text-muted uppercase mb-2 block">CATEGORY</label>
                <div className="space-y-2">
                  {['Retail', 'Cafes', 'Delivery', 'Campus jobs'].map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                      <span className="text-sm text-text-main group-hover:text-primary transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-teal-50 shadow-soft">
            <Search className="text-text-muted ml-2" />
            <input type="text" placeholder="Search for jobs..." className="bg-transparent border-none outline-none text-sm w-full" />
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-[2rem] border border-teal-50 shadow-soft hover:shadow-lg transition-all group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">{job.title}</h4>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-text-muted text-xs">
                        <MapPin size={14} />
                        {job.location}
                      </div>
                      <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 rounded-md text-text-muted uppercase tracking-wider">{job.type}</span>
                    </div>
                  </div>
                </div>
                <a 
                  href={job.link}
                  target="_blank"
                  rel="no-referrer"
                  className="w-full sm:w-auto bg-primary/10 text-primary font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-sm hover:bg-primary hover:text-white transition-all"
                >
                  View Details <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>

          <div className="bg-white p-12 rounded-[2.5rem] border border-teal-50 border-dashed text-center">
            <p className="text-text-muted">Searching for more opportunities in your area...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
