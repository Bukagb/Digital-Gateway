import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Clock,
  AlertCircle,
  ExternalLink,
  CheckCircle2,
  Info,
  ChevronRight,
  MessageCircle,
  HelpCircle,
  Landmark,
  Train,
  GraduationCap,
  Globe,
  Home,
  Sparkles,
  Zap,
  UploadCloud,
  ShieldCheck,
  FileSearch,
  AlertTriangle,
  FileText,
  Check,
  Upload,
  RefreshCw
} from 'lucide-react';
import { Task, TaskStatus, UserProfile } from '../types';

interface TaskDetailProps {
  taskId: string;
  tasks: Task[];
  user: UserProfile;
  onBack: () => void;
  onUpdateStatus: (taskId: string, status: TaskStatus) => void;
}

export default function TaskDetail({ taskId, tasks, user, onBack, onUpdateStatus }: TaskDetailProps) {
  const [showAIHelp, setShowAIHelp] = React.useState(false);
  const [serviceType, setServiceType] = React.useState<'self' | 'assisted'>('assisted');
  const [isAssistedStarted, setIsAssistedStarted] = React.useState(false);
  const [assistedStep, setAssistedStep] = React.useState(1);
  const [uploadStatus, setUploadStatus] = React.useState<Record<string, 'uploaded' | 'missing' | 'correction'>>({
    'Passport': 'missing',
    'Address Proof': 'missing',
    'Enrollment Proof': 'missing'
  });

  const task = tasks.find(t => t.id === taskId);

  if (!task) return <div>Task not found</div>;

  const [isUploading, setIsUploading] = React.useState(false);

  const hasVisa = user.visaStatus === 'Approved';
  const isRestricted = !hasVisa && (taskId === 'nif' || taskId === 'bank-account');

  const simulateUpload = () => {
    setIsUploading(true);
    const isNIF = taskId === 'nif';
    const docsToUpload = isNIF ? ['Passport', 'Address Proof'] : ['Passport', 'Visa', 'NIF', 'Address Proof', 'Enrollment Proof', 'Financial Proof'];

    // Simulate initial upload delay
    setTimeout(() => {
      setUploadStatus(prev => {
        const next = { ...prev };
        docsToUpload.forEach(d => next[d] = 'uploaded');
        return next;
      });
      setIsUploading(false);
      setAssistedStep(2);
    }, 1500);
  };

  const renderAssistedService = () => {
    const isNIF = taskId === 'nif';
    const price = isNIF ? '€25' : '€50';
    const docs = isNIF ? ['Passport', 'Address Proof'] : ['Passport', 'Visa', 'NIF', 'Address Proof', 'Enrollment Proof', 'Financial Proof'];

    if (!isAssistedStarted && serviceType === 'assisted') {
      return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <section className="bg-primary/5 p-8 rounded-[2.5rem] border-2 border-primary/20 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-2xl transition-all group-hover:scale-150"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-ink">Skip the stress — we’ll handle it for you</h3>
                  <p className="text-text-muted text-sm max-w-xl">
                    Upload your documents, and our system will check everything for accuracy. A Digital Gateway expert will review and submit your application on your behalf.
                  </p>
                </div>
                <div className="bg-primary text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20">
                  <Zap size={14} className="fill-white" /> Faster than self-service
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: FileSearch, text: 'AI-powered document check' },
                  { icon: ShieldCheck, text: 'Expert review & submission' },
                  { icon: AlertTriangle, text: 'Fewer errors, fewer delays' },
                  { icon: Clock, text: 'Faster processing time' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/60 p-4 rounded-2xl border border-white/40">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <item.icon size={16} />
                    </div>
                    <span className="text-[11px] font-bold text-ink">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-primary/10">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-ink">{price}</span>
                  <span className="text-xs text-text-muted font-bold uppercase tracking-widest">Single Payment</span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => setIsAssistedStarted(true)}
                    className="bg-primary text-white font-bold px-10 py-4 rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all text-sm"
                  >
                    Start Assisted Application
                  </button>
                  <p className="text-[10px] text-text-muted">Your documents are securely handled. We review everything before submission.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Regular self-service content still visible as fallback or comparison */}
          <div className="opacity-50 pointer-events-none grayscale">
            {isNIF ? renderNIFContent() : renderAIMAContent()}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-10 animate-in fade-in duration-500">
        {/* Stepper Header */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
          <div className="flex justify-between items-center mb-8 max-w-2xl mx-auto">
            {[
              { step: 1, label: 'Upload' },
              { step: 2, label: 'AI Review' },
              { step: 3, label: 'Expert Check' },
              { step: 4, label: 'Submitted' },
              { step: 5, label: 'Tracking' }
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-2 relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${assistedStep >= s.step ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 text-gray-400'
                  }`}>
                  {assistedStep > s.step ? <Check size={16} /> : s.step}
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-widest ${assistedStep >= s.step ? 'text-primary' : 'text-gray-400'}`}>
                  {s.label}
                </span>
                {i < 4 && (
                  <div className={`absolute top-5 left-10 w-12 h-0.5 ${assistedStep > s.step ? 'bg-primary' : 'bg-gray-100'}`} />
                )}
              </div>
            ))}
          </div>

          {assistedStep === 1 && (
            <div className="space-y-8 max-w-2xl mx-auto text-center">
              <div>
                <h3 className="text-xl font-bold mb-2">Upload your documents</h3>
                <p className="text-text-muted text-sm">Add the required documents to get started.</p>
              </div>

              <div
                onClick={() => !isUploading && simulateUpload()}
                className={`border-2 border-dashed rounded-[2rem] p-12 transition-all group cursor-pointer relative overflow-hidden ${isUploading ? 'border-primary bg-primary/5 cursor-wait' : 'border-gray-200 hover:border-primary'
                  }`}
              >
                {isUploading && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    className="absolute bottom-0 left-0 h-1 bg-primary"
                  />
                )}
                <div className="flex flex-col items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${isUploading ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-primary/5 group-hover:text-primary'
                    }`}>
                    {isUploading ? <RefreshCw size={32} className="animate-spin" /> : <UploadCloud size={32} />}
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-ink">{isUploading ? 'Uploading documents...' : 'Drag & drop files here'}</p>
                    <p className="text-xs text-text-muted">PDF or JPEG, max 10MB each</p>
                  </div>
                  {!isUploading && (
                    <button className="bg-white border-2 border-gray-100 px-6 py-2 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all mt-2">
                      Or select files
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-left text-gray-400">Required Documents</p>
                {docs.map(docName => (
                  <div key={docName} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 italic">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-gray-400" />
                      <span className="text-sm font-medium text-ink">{docName}</span>
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-white rounded-md border border-gray-100 ${uploadStatus[docName] === 'uploaded' ? 'text-emerald-500 border-emerald-100' : 'text-gray-400'
                      }`}>
                      {uploadStatus[docName] === 'uploaded' ? '✓ Uploaded' : 'Missing'}
                    </span>
                  </div>
                ))}
              </div>

              <button
                disabled={isUploading || !Object.values(uploadStatus).some(s => s === 'uploaded')}
                onClick={() => setAssistedStep(2)}
                className={`w-full font-bold py-4 rounded-2xl shadow-xl transition-all ${isUploading || !Object.values(uploadStatus).some(s => s === 'uploaded')
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                    : 'bg-primary text-white shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]'
                  }`}
              >
                {isUploading ? 'Uploading...' : 'Continue to AI Review'}
              </button>
            </div>
          )}

          {assistedStep === 2 && (
            <div className="space-y-8 max-w-2xl mx-auto text-center animate-in fade-in slide-in-from-top-4">
              <div>
                <h3 className="text-xl font-bold mb-2">We’re reviewing your documents</h3>
                <p className="text-text-muted text-sm">Our system checks for missing or incorrect details.</p>
              </div>

              <div className="space-y-3 text-left">
                {docs.map((docName, i) => (
                  <div key={docName} className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText size={20} className="text-primary" />
                        <span className="font-bold text-ink">{docName}</span>
                      </div>
                      {i === 2 && isNIF ? (
                        <div className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold flex items-center gap-1.5 border border-amber-100 animate-pulse">
                          <AlertTriangle size={12} /> NEEDS CORRECTION
                        </div>
                      ) : (
                        <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold flex items-center gap-1.5 border border-emerald-100">
                          <Check size={12} /> VALID DOCUMENT
                        </div>
                      )}
                    </div>
                    {i === 2 && isNIF && (
                      <div className="p-3 bg-red-50 rounded-xl text-red-600 text-xs font-medium border border-red-100">
                        The document is slightly blurry and the address is not fully legible. Please re-upload a clearer scan.
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setAssistedStep(4)}
                className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Proceed to Expert Submission
              </button>
            </div>
          )}

          {assistedStep === 4 && (
            <div className="space-y-8 max-w-2xl mx-auto text-center animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-xl">
                <ShieldCheck size={48} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-ink">Submitted by our team</h3>
                <p className="text-text-muted text-sm">A Digital Gateway expert will handle your application.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 text-left">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Current Status</span>
                  <span className="px-3 py-1 bg-primary text-white rounded-full text-[10px] font-bold">Processing</span>
                </div>
                <div className="space-y-6">
                  {[
                    { label: 'Submitted', date: 'Today, 10:24 AM', done: true },
                    { label: 'Processing', date: 'In Progress', done: false },
                    { label: 'Expert Review', date: 'Pending', done: false },
                    { label: 'Approved', date: 'Expected 2-3 days', done: false }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 relative">
                      {i < 3 && <div className="absolute left-2.5 top-5 w-0.5 h-6 bg-gray-200" />}
                      <div className={`w-5 h-5 rounded-full border-2 z-10 flex items-center justify-center shadow-sm ${item.done ? 'bg-primary border-primary text-white' : 'bg-white border-gray-200'}`}>
                        {item.done && <Check size={10} />}
                      </div>
                      <div>
                        <p className={`text-xs font-bold leading-none mb-1 ${item.done ? 'text-ink' : 'text-gray-400'}`}>{item.label}</p>
                        <p className="text-[10px] text-gray-400">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setAssistedStep(5)}
                  className="w-full bg-ink text-white font-bold py-4 rounded-2xl shadow-xl hover:bg-black transition-all"
                >
                  View Final Completion
                </button>
              </div>
            </div>
          )}

          {assistedStep === 5 && (
            <div className="space-y-8 max-w-2xl mx-auto text-center animate-in fade-in duration-700">
              <div className="w-24 h-24 bg-primary text-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl rotate-12">
                <Check size={56} strokeWidth={4} />
              </div>
              <div>
                <h3 className="text-3xl font-black mb-2 text-ink">Your {isNIF ? 'NIF' : 'Document'} is ready!</h3>
                <p className="text-text-muted text-sm">Congratulations! Digital Gateway has successfully processed your application.</p>
              </div>

              {isNIF && (
                <div className="bg-ink p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full -mr-24 -mt-24 blur-3xl animate-pulse"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">PORTUGUESE TAX ID (NIF)</p>
                    <h4 className="text-4xl font-mono font-black tracking-widest text-white mb-6">284 921 735</h4>
                    <button className="flex items-center gap-2 bg-white text-ink px-8 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform">
                      <Upload size={18} className="rotate-180" /> Download PDF
                    </button>
                  </div>
                </div>
              )}

              {!isNIF && (
                <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 border-dashed">
                  <p className="text-sm font-medium text-ink mb-4">You have successfully secured your residency appointment slot.</p>
                  <button className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm mx-auto shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                    <ExternalLink size={18} /> View Confirmation
                  </button>
                </div>
              )}

              <div className="pt-6">
                <button
                  onClick={() => onUpdateStatus(taskId, 'Completed')}
                  className="text-primary font-bold underline underline-offset-8 decoration-primary/30 hover:decoration-primary transition-all"
                >
                  Back to Journey Map
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderNIFContent = () => (
    <div className="space-y-10">
      <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="text-text-muted leading-relaxed">
          The NIF (Número de Identificação Fiscal) is the Portuguese tax identification number. It's the first and most critical document you need. You'll need it to rent an apartment, get a phone contract, open a bank account, and even sign up for a gym.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center text-primary text-sm">1</span>
            Requirements
          </h3>
          <ul className="space-y-4">
            {[
              'Valid Passport (Original + Copy)',
              'Proof of Address (Temporary/Airbnb is usually accepted)',
              'Fiscal Representative (Only if you are from outside the EU/EEA/UK)'
            ].map((req, i) => (
              <li key={i} className="flex gap-3 text-text-main">
                <CheckCircle2 size={20} className="text-primary shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 p-4 bg-orange-50 rounded-2xl flex gap-3">
            <AlertCircle size={20} className="text-accent shrink-0" />
            <div className="space-y-1">
              <p className="text-xs text-orange-800 leading-normal font-bold">Standard processing time</p>
              <p className="text-[10px] text-orange-700 leading-normal">
                May take longer depending on errors or office availability.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center text-primary text-sm">2</span>
            Step-by-Step Guide
          </h3>
          <div className="space-y-6">
            {[
              { step: 'Book Appointment', desc: 'Visit the Portal das Finanças or call to schedule.' },
              { step: 'Prepare Docs', desc: 'Ensure your passport is valid for at least 6 months.' },
              { step: 'Visit Finanças', desc: 'Go to the office at your specified time.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-bold text-text-main">{item.step}</h4>
                  <p className="text-sm text-text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
        <h3 className="text-xl font-bold mb-6">Expert Tips</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            'Go early (offices often open at 9 AM).',
            'Check multiple tax offices (some are less busy).',
            'If you have a digital key (Chave Móvel Digital), you can do some steps online.'
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-3">
              <Info size={18} className="text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-text-muted">{tip}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="flex gap-6 items-center">
          <div className="w-20 h-24 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden shadow-inner rotate-3">
            <img src="https://images.unsplash.com/photo-1633158829585-23bb8f628e32?auto=format&fit=crop&q=80&w=100" alt="Doc" className="opacity-50 grayscale" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Book NIF Appointment</h3>
            <p className="text-text-muted text-sm max-w-sm">Official government portal for tax services and e-balcão.</p>
          </div>
        </div>
        <a
          href="https://sitfiscal.portaldasfinancas.gov.pt/ebalcao/apm"
          target="_blank"
          rel="no-referrer"
          className="w-full md:w-auto bg-primary text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:scale-105 transition-transform"
        >
          Go to Official Site <ExternalLink size={18} />
        </a>
      </section>
    </div>
  );

  const renderAIMAContent = () => (
    <div className="space-y-10">
      <div className="relative h-64 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1540331547168-8b63109225b7?auto=format&fit=crop&q=80&w=800"
          alt="AIMA Office"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-8 left-8 text-white">
          <h3 className="text-2xl font-bold">AIMA Headquarters</h3>
          <p className="opacity-80">Immigration and Asylum Agency</p>
        </div>
      </div>

      <section className="bg-white p-8 rounded-[2.5rem] border border-organic shadow-soft">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="text-text-muted leading-relaxed">
          AIMA handles residence permits and legal stay in Portugal. This is one of the most important steps for international students to ensure your stay remains legal and you can eventually travel within the Schengen area without issues.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white p-8 rounded-[2.5rem] border border-organic shadow-soft">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle2 size={24} className="text-primary" />
            Requirements
          </h3>
          <ul className="space-y-4">
            {[
              'Valid Passport',
              'Visa (if applicable)',
              'NIF Document',
              'Proof of Address in Portugal',
              'University Enrollment Proof',
              'Financial Proof (Bank statement)'
            ].map((req, i) => (
              <li key={i} className="flex gap-3 text-text-main items-center">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span className="text-sm">{req}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white p-8 rounded-[2.5rem] border border-organic shadow-soft">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Clock size={24} className="text-primary" />
            Timeline
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Standard Scheduling</p>
              <p className="text-sm font-medium">Wait time can be 2–4 months (may take longer)</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Approval</p>
              <p className="text-sm font-medium">Final approval takes several weeks after appointment</p>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-white p-8 rounded-[2.5rem] border border-organic shadow-soft">
        <h3 className="text-xl font-bold mb-6">Step-by-Step Instructions</h3>
        <div className="space-y-8">
          {[
            { title: 'Gather Documents', desc: 'Prepare all paperwork according to the requirements list above.' },
            { title: 'Submit Request', desc: 'Submit your request through the AIMA contact form or wait for automatic scheduling if you have a D-type visa.' },
            { title: 'Monitor Email', desc: 'Check your email regularly for your appointment notification.' },
            { title: 'Attend Appointment', desc: 'Show up in person at the designated AIMA office with all original documents.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-6">
              <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              <div>
                <h4 className="font-bold text-lg text-ink mb-1">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-orange-50 p-8 rounded-[2.5rem] border border-orange-100 shadow-soft">
          <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
            <AlertCircle size={20} /> Challenges
          </h3>
          <ul className="space-y-3 text-sm text-orange-800">
            <li>• Extremely long waiting times</li>
            <li>• Limited appointment availability</li>
            <li>• Potential language barriers with staff</li>
          </ul>
        </section>

        <section className="bg-teal-50 p-8 rounded-[2.5rem] border border-teal-100 shadow-soft">
          <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <Info size={20} /> Tips
          </h3>
          <ul className="space-y-3 text-sm text-teal-800">
            <li>• Check your email (and spam) multiple times per day</li>
            <li>• Prepare digital and physical copies of all documents</li>
            <li>• Bring a Portuguese-speaking friend if possible</li>
          </ul>
        </section>
      </div>

      <section className="bg-white p-10 rounded-[2.5rem] border-2 border-primary shadow-soft text-center">
        <h3 className="text-2xl font-bold mb-4">Official AIMA Contact</h3>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">Use the official contact form to request an appointment if you haven't received one automatically.</p>
        <a
          href="https://contactenos.aima.gov.pt/contact-form"
          target="_blank"
          rel="no-referrer"
          className="inline-flex items-center gap-3 bg-primary text-white font-bold px-12 py-5 rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 transition-transform"
        >
          Contact AIMA <ExternalLink size={20} />
        </a>
      </section>
    </div>
  );

  const renderTaskContent = () => {
    if (serviceType === 'assisted' && (taskId === 'nif' || taskId === 'aima-appointment')) {
      return renderAssistedService();
    }

    switch (taskId) {
      case 'nif':
        return renderNIFContent();

      case 'phone-number':
        return (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Woo', price: '€5', data: '100GB', best: true },
                { name: 'Digi', price: '€7', data: 'Unlimited', best: false },
                { name: 'Uzo', price: '€6', data: '50GB', best: false }
              ].map((provider) => (
                <div key={provider.name} className={`p-6 rounded-[2rem] border transition-all ${provider.best ? 'border-primary bg-primary-light/10 ring-4 ring-primary/5' : 'border-teal-50 bg-white'}`}>
                  <h4 className="text-xl font-extrabold mb-1">{provider.name}</h4>
                  <p className="text-primary font-bold text-2xl mb-4">{provider.price}<span className="text-sm font-normal text-text-muted">/month</span></p>
                  <p className="text-sm text-text-muted mb-6">{provider.data} included</p>
                  <button className={`w-full py-2.5 rounded-xl text-xs font-bold ${provider.best ? 'bg-primary text-white' : 'bg-gray-100 text-text-main'}`}>
                    CHOOSE PLAN
                  </button>
                </div>
              ))}
            </div>

            <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
              <h3 className="text-xl font-bold mb-6">Where to get it?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { title: 'NorteShopping', desc: 'Huge mall with all providers' },
                  { title: 'Kiosks', desc: 'Found in metro stations' },
                  { title: 'Online', desc: 'Sim cards mailed to you' }
                ].map((loc, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-primary shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-text-main">{loc.title}</h4>
                      <p className="text-xs text-text-muted">{loc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="p-6 bg-primary-light/30 border border-primary/20 rounded-[2rem] flex items-start gap-4">
              <Info className="text-primary shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-bold text-primary mb-1">Critical Insight</h4>
                <p className="text-primary-dark text-sm leading-relaxed">
                  In Portugal, many digital services and bank applications send OTP codes via SMS. Without a local number, you might be blocked from opening a bank account or using the public transport app.
                </p>
              </div>
            </div>
          </div>
        );

      case 'metro-card':
        return (
          <div className="space-y-10">
            <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
              <h3 className="text-xl font-bold mb-6">Pass Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-3xl bg-teal-50 border border-teal-100 relative group cursor-pointer hover:shadow-lg transition-all">
                  <div className="absolute top-4 right-4 bg-white/50 p-2 rounded-xl">
                    <Train size={24} className="text-primary" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Monthly Pass</h4>
                  <p className="text-3xl font-extrabold text-primary mb-6">€40.00</p>
                  <p className="text-sm text-text-muted mb-4">Unlimited rides on Metro, Busses, and Trains within selected zones.</p>
                  <ul className="text-xs space-y-2 text-text-main mb-6">
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary" /> Students under 23 get it for FREE</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary" /> Covers entire city network</li>
                  </ul>
                </div>
                <div className="p-6 rounded-3xl bg-orange-50 border border-orange-100 relative group cursor-pointer hover:shadow-lg transition-all">
                  <div className="absolute top-4 right-4 bg-white/50 p-2 rounded-xl">
                    <Train size={24} className="text-accent" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Pay-as-you-go</h4>
                  <p className="text-3xl font-extrabold text-accent mb-6">€1.25<span className="text-sm">/ride</span></p>
                  <p className="text-sm text-text-muted mb-4">Best for occasional travelers or exploring the city on weekends.</p>
                </div>
              </div>
            </section>

            <div className="flex flex-col lg:flex-row gap-8">
              <section className="flex-1 bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
                <h3 className="text-xl font-bold mb-6">Instructions</h3>
                <div className="space-y-6">
                  {[
                    { step: 'Locate Machine', desc: 'Find blue Andante machines at any station.' },
                    { step: 'Select Card', desc: 'Buy a new card or top up existing one.' },
                    { step: 'Validate', desc: 'Always tap before boarding every vehicle.' }
                  ].map((s, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                      <div>
                        <h4 className="font-bold text-text-main">{s.step}</h4>
                        <p className="text-sm text-text-muted">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="w-full lg:w-80 bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft flex flex-col items-center text-center">
                <div className="w-48 h-32 bg-primary rounded-2xl relative shadow-2xl mb-8 overflow-hidden transform group hover:rotate-3 transition-transform">
                  <div className="absolute top-4 left-4 text-white font-bold opacity-80 italic">ANDANTE</div>
                  <div className="absolute bottom-4 right-4 text-white opacity-40"><Train size={48} /></div>
                  <div className="w-full h-8 bg-black/10 absolute top-12"></div>
                </div>
                <h4 className="font-bold text-lg mb-2">Andante Card</h4>
                <p className="text-sm text-text-muted mb-6">The blue reloadable card used in the Porto metropolitan area.</p>
                <a href="https://andante.pt/en/purchase/anda-app/" className="w-full bg-primary text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm">
                  Get App <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        );

      case 'aima-appointment':
        return renderAIMAContent();

      case 'language-classes':
        return (
          <div className="space-y-10">
            <div className="relative h-64 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
                alt="Language Class"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold">Portuguese Learning</h3>
                <p className="opacity-80">Integration through communication</p>
              </div>
            </div>

            <section className="bg-white p-8 rounded-[2.5rem] border border-organic shadow-soft">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-text-muted leading-relaxed">
                Learning Portuguese is essential for full integration into Portuguese society. It helps with everyday tasks, navigating government bureaucracy, finding better job opportunities, and reducing the stress of relocation.
              </p>
            </section>

            <section className="bg-white p-8 rounded-[2.5rem] border border-organic shadow-soft">
              <h3 className="text-xl font-bold mb-6">Learning Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Free Gov Classes', provider: 'IEFP (PLA Program)', icon: Globe },
                  { name: 'University Programs', provider: 'Intensive Courses', icon: GraduationCap },
                  { name: 'Private Schools', provider: 'Various Providers', icon: MessageCircle }
                ].map((opt, i) => (
                  <div key={i} className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary mb-4 shadow-sm">
                      <opt.icon size={20} />
                    </div>
                    <h4 className="font-bold text-sm mb-1">{opt.name}</h4>
                    <p className="text-xs text-gray-500">{opt.provider}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section className="bg-white p-8 rounded-[2.5rem] border border-organic shadow-soft">
                <h3 className="text-xl font-bold mb-6">Step-by-Step</h3>
                <div className="space-y-6">
                  {[
                    { step: 'Visit IEFP Website', note: 'Go to the official portal for employment and training.' },
                    { step: 'Search Courses', note: 'Look for "Portuguese for foreigners" or "PLA" courses.' },
                    { step: 'Register Online', note: 'You can register through the portal or visit an IEFP center.' },
                    { step: 'Wait for Placement', note: 'After registration, you will be notified of your class schedule.' },
                  ].map((s, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary-light text-primary font-bold flex items-center justify-center text-xs shrink-0">{i + 1}</div>
                      <div>
                        <h4 className="font-bold text-sm mb-1">{s.step}</h4>
                        <p className="text-xs text-gray-500">{s.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white p-8 rounded-[2.5rem] border border-organic shadow-soft">
                <h3 className="text-xl font-bold mb-6">Quick Facts</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">REQUIREMENTS</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Valid Passport</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> NIF (if applicable)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Local Address Proof</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">BENEFITS</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Easier communication</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Job opportunities</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Faster bureaucratic processes</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            <section className="bg-white p-10 rounded-[2.5rem] border border-organic shadow-soft text-center">
              <h3 className="text-2xl font-bold mb-4">Find Your Class</h3>
              <p className="text-gray-500 mb-8 max-w-lg mx-auto">Explore the available Portuguese language programs on the official IEFP portal.</p>
              <a
                href="https://iefp.pt/"
                target="_blank"
                rel="no-referrer"
                className="inline-flex items-center gap-3 bg-primary text-white font-bold px-12 py-5 rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 transition-transform"
              >
                Find Language Classes <ExternalLink size={20} />
              </a>
            </section>
          </div>
        );

      case 'bank-account':
        return (
          <div className="space-y-10">
            {/* Visual Header */}
            <div className="relative h-64 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1200"
                alt="Bank Card and App"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold">Portuguese Banking</h3>
                <p className="opacity-80">Smooth financial transition</p>
              </div>
            </div>

            {/* Dependencies Warning */}
            <section className="bg-orange-50 p-8 rounded-[2.5rem] border-2 border-orange-100 flex items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-accent shadow-sm shrink-0">
                <AlertCircle size={32} />
              </div>
              <div>
                <h4 className="font-bold text-orange-950 text-lg mb-1">Mandatory Prerequisites</h4>
                <p className="text-orange-900 leading-relaxed font-medium">
                  You <span className="underline decoration-2">must</span> have a <span className="font-bold">NIF</span> and a <span className="font-bold">Portuguese phone number</span> before opening a bank account in Portugal.
                </p>
              </div>
            </section>

            <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-text-muted leading-relaxed">
                Opening a local bank account is essential for settling in Portugal. You'll need it to pay your monthly rent, receive your salary or scholarship, set up utilities (electricity, water, internet), and make daily payments easily without foreign transaction fees.
              </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle2 size={24} className="text-primary" />
                  Requirements
                </h3>
                <ul className="space-y-4">
                  {[
                    'NIF Certificate (Mandatory)',
                    'Portuguese Phone Number',
                    'Passport / National ID Card',
                    'Proof of Address (Utility bill or Rental contract)',
                    'Proof of Enrollment (for Student accounts)'
                  ].map((req, i) => (
                    <li key={i} className="flex gap-3 text-text-main items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span className="text-sm font-medium">{req}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Landmark size={24} className="text-primary" />
                  Popular Banks
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { name: 'Revolut', desc: 'Easiest & fastest digital onboarding.', tag: 'DIGITAL FIRST' },
                    { name: 'ActivoBank', desc: 'Student-friendly, no maintenance fees.', tag: 'MOST POPULAR' },
                    { name: 'Millennium BCP', desc: 'Large branch network, great app.', tag: 'TRADITIONAL' },
                    { name: 'Novo Banco', desc: 'Solid services for expats.', tag: 'TRADITIONAL' },
                    { name: 'Santander', desc: 'Global presence and reliability.', tag: 'TRADITIONAL' }
                  ].map((bank, i) => (
                    <div key={i} className="group p-4 bg-gray-50 rounded-2xl hover:bg-white hover:border-primary/20 border border-transparent transition-all">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-sm text-ink">{bank.name}</h4>
                        <span className="text-[8px] font-black px-2 py-1 bg-white rounded-md text-primary uppercase shadow-sm">{bank.tag}</span>
                      </div>
                      <p className="text-xs text-text-muted">{bank.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
              <h3 className="text-xl font-bold mb-8">Step-by-Step Guide</h3>

              {/* Progress Tracker */}
              <div className="relative mb-12">
                <div className="absolute top-6 left-0 w-full h-1 bg-gray-100 rounded-full"></div>
                <div className="absolute top-6 left-0 w-1/4 h-1 bg-primary rounded-full"></div>
                <div className="relative flex justify-between">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-sm z-10 transition-all ${s === 1 ? 'bg-primary border-primary-light text-white shadow-lg' : 'bg-white border-gray-100 text-gray-300'
                        }`}>
                        {s}
                      </div>
                      <p className="mt-2 text-[10px] font-bold text-gray-400">STEP {s}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-10">
                {[
                  { step: 'Get NIF', desc: 'Must be completed first at Finanças or via a representative.' },
                  { step: 'Get Phone Number', desc: 'Get a Portuguese SIM card for SMS verification and OTPs.' },
                  { step: 'Choose Bank', desc: 'Decide between a digital bank for speed or traditional for branches.' },
                  { step: 'Apply Online or Visit Branch', desc: 'Submit documents through the app or book an in-person visit.' },
                  { step: 'Receive Card', desc: 'Wait 3-5 business days for your physical card to arrive in the mail.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-primary font-bold shrink-0 shadow-sm">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-ink mb-1">{item.step}</h4>
                      <p className="text-sm text-text-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-teal-50 p-8 rounded-[2.5rem] border border-teal-100 shadow-soft">
              <h3 className="text-xl font-bold text-primary mb-6">Expert Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-3xl shadow-sm">
                  <h4 className="font-bold text-ink mb-2">🚀 Fastest Start</h4>
                  <p className="text-sm text-text-muted">
                    <span className="font-bold text-primary">Revolut</span> is by far the fastest. You can often open an account and have a virtual card ready in minutes.
                  </p>
                </div>
                <div className="p-6 bg-white rounded-3xl shadow-sm">
                  <h4 className="font-bold text-ink mb-2">🏛️ Traditional Banks</h4>
                  <p className="text-sm text-text-muted">
                    Banks like Millennium or Santander often require <span className="font-bold text-primary">in-person visits</span>. Book your slot ahead of time.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white p-10 rounded-[2.5rem] border-2 border-primary shadow-soft text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to choose?</h3>
              <p className="text-gray-500 mb-8 max-w-lg mx-auto">Click below to ask our AI which bank perfectly fits your status as a student or expat.</p>
              <button
                className="bg-primary text-white font-bold px-12 py-5 rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 transition-transform flex items-center justify-center gap-3 mx-auto"
              >
                Which bank is best for me? <ChevronRight size={20} />
              </button>
            </section>
          </div>
        );

      case 'sns-registration':
        return (
          <div className="space-y-10">
            <div className="relative h-64 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800"
                alt="Healthcare"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold">Public Healthcare (SNS)</h3>
                <p className="opacity-80">Access to the National Health Service</p>
              </div>
            </div>

            <section className="bg-white p-8 rounded-[2.5rem] border border-organic shadow-soft">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-text-muted leading-relaxed">
                The SNS (Serviço Nacional de Saúde) provides access to public healthcare in Portugal. Registering gets you an SNS number, allowing you to access public doctors, hospitals, and subsidized medications.
              </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section className="bg-white p-8 rounded-[2.5rem] border border-organic shadow-soft">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle2 size={24} className="text-primary" />
                  Requirements
                </h3>
                <ul className="space-y-4 text-sm font-medium">
                  <li>• NIF Document</li>
                  <li>• Proof of Residence (Atestado de Residência)</li>
                  <li>• Valid Passport</li>
                  <li>• Proof of Enrollment in University</li>
                </ul>
              </section>

              <section className="bg-white p-8 rounded-[2.5rem] border border-organic shadow-soft">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Info size={24} className="text-primary" />
                  Health Centers
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Registration must be done at the <span className="font-bold text-ink">Centro de Saúde</span> nearest to your home.
                </p>
                <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100 italic text-[11px] text-teal-950">
                  Search Maps for: "Centro de Saúde [Your Parish Name]"
                </div>
              </section>
            </div>

            <section className="bg-white p-8 rounded-[2.5rem] border border-organic shadow-soft">
              <h3 className="text-xl font-bold mb-6">Step-by-Step</h3>
              <div className="space-y-6">
                {[
                  { title: 'Find Your Center', desc: 'Identify the specific healthcare unit for your residential area.' },
                  { title: 'Visit in Person', desc: 'Visit early in the morning as queues can be long.' },
                  { title: 'Submit & Register', desc: 'Hand in your documents. Usually, you receive your number instantly.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0">{i + 1}</div>
                    <div>
                      <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="bg-emerald-50 p-8 rounded-[2.5rem] border border-emerald-100">
                <h3 className="text-xl font-bold text-emerald-900 mb-4">Benefits</h3>
                <ul className="space-y-3 text-sm text-emerald-800">
                  <li>• Access to primary care family doctors</li>
                  <li>• Significantly reduced costs for specialists</li>
                  <li>• Subsidized medication prices</li>
                </ul>
              </section>

              <section className="bg-amber-50 p-8 rounded-[2.5rem] border border-amber-100">
                <h3 className="text-xl font-bold text-amber-900 mb-4">Important Note</h3>
                <p className="text-sm text-amber-800 leading-relaxed font-medium">
                  "While emergency visits are covered, having an SNS number allows you to book routine checks and follow-ups without high costs."
                </p>
              </section>
            </div>
          </div>
        );

      case 'housing-search':
        return (
          <div className="space-y-10">
            {/* Visual Headers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative h-64 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800"
                  alt="Apartment interior"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-primary shadow-sm uppercase tracking-wider">Apartment</div>
              </div>
              <div className="relative h-64 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800"
                  alt="Student housing"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-primary shadow-sm uppercase tracking-wider">Student Living</div>
              </div>
            </div>

            {/* Overview */}
            <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-text-muted leading-relaxed">
                Housing is one of the most important and challenging steps for international students. Finding a permanent address isn't just about comfort; it's practically mandatory for finalizing your <span className="font-bold text-primary">NIF</span>, opening a full <span className="font-bold text-primary">bank account</span>, and completing your <span className="font-bold text-primary">residency registration</span>.
              </p>
            </section>

            {/* Dependencies Notification */}
            <div className="p-6 bg-primary-light/20 border border-primary/20 rounded-[2rem] flex items-center gap-4">
              <Info className="text-primary shrink-0" size={24} />
              <p className="text-sm font-bold text-primary-dark">
                Note: You may need a housing address to complete NIF or residency registration.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Types of Housing */}
              <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
                <h3 className="text-xl font-bold mb-6">Types of Housing</h3>
                <div className="space-y-4">
                  {[
                    { type: 'Student Residences', desc: 'University or private dorms with social areas.' },
                    { type: 'Shared Apartments', desc: 'Private room in a shared flat with other students/expats.' },
                    { type: 'Private Studios', desc: 'Full privacy, usually the most expensive option.' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                        <Home size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-ink">{item.type}</h4>
                        <p className="text-xs text-text-muted">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Requirements & Pricing */}
              <div className="space-y-8">
                <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
                  <h3 className="text-xl font-bold mb-6">Requirements</h3>
                  <ul className="space-y-3">
                    {['Valid Passport', 'Proof of income or guarantor (sometimes)', 'Deposit (usually 1–2 months rent)'].map((req, i) => (
                      <li key={i} className="flex gap-3 text-sm font-medium text-text-main items-center">
                        <CheckCircle2 size={18} className="text-primary" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
                  <h3 className="text-xl font-bold mb-6">Average Pricing</h3>
                  <div className="flex gap-4">
                    <div className="flex-1 p-4 bg-gray-50 rounded-2xl text-center">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Shared Room</p>
                      <p className="text-lg font-bold text-primary">€250 – €500</p>
                    </div>
                    <div className="flex-1 p-4 bg-gray-50 rounded-2xl text-center">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Private Studio</p>
                      <p className="text-lg font-bold text-primary">€600 – €1000</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Trusted Platforms */}
            <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-ink">Trusted Platforms</h3>
                  <p className="text-xs text-text-muted">Verified partners for safe student housing in Portugal.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Verified Listings</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'Uniplaces', url: 'https://www.uniplaces.com/', logo: 'U', color: 'bg-blue-600', desc: 'Mid-long term stays' },
                  { name: 'Idealista', url: 'https://www.idealista.pt/', logo: 'I', color: 'bg-emerald-600', desc: 'Real estate portal' },
                  { name: 'Spotahome', url: 'https://www.spotahome.com/', logo: 'S', color: 'bg-orange-600', desc: 'Online booking focus' },
                  { name: 'Inlife', url: 'https://inlifeportugal.com/', logo: 'N', color: 'bg-purple-600', desc: 'Video tours available' }
                ].map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="no-referrer"
                    className="flex flex-col items-center p-6 bg-gray-50/50 rounded-[2rem] border border-gray-100 hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all group"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${platform.color} flex items-center justify-center text-white font-black text-2xl mb-4 shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all`}>
                      {platform.logo}
                    </div>
                    <h4 className="font-bold text-base mb-1 text-ink">{platform.name}</h4>
                    <p className="text-[10px] text-text-muted mb-4 font-medium">{platform.desc}</p>
                    <span className="text-[10px] text-primary font-bold flex items-center gap-1 uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full group-hover:bg-primary group-hover:text-white transition-all">
                      Visit Site <ExternalLink size={10} />
                    </span>
                  </a>
                ))}
              </div>
              <div className="mt-8 p-4 bg-orange-50/50 rounded-2xl border border-orange-100 flex items-center gap-3">
                <AlertCircle className="text-accent shrink-0" size={20} />
                <p className="text-xs text-orange-900 leading-normal">
                  <strong>Facebook Groups:</strong> Use with extreme caution. Never pay a deposit before seeing a room in person or through a verified platform. Ask them for a video tour or a "Contrato de Arrendamento" proof first.
                </p>
              </div>
            </section>

            {/* Step-by-Step Guide */}
            <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
              <h3 className="text-xl font-bold mb-8">Step-by-Step Guide</h3>
              <div className="space-y-8">
                {[
                  { title: 'Decide budget and city', desc: 'Factor in utilities (electricity/water) which are sometimes extra.' },
                  { title: 'Search on trusted platforms', desc: 'Use filters for location, price, and "verified" listings.' },
                  { title: 'Contact landlord or book online', desc: 'Have your documents ready to show profile seriousness.' },
                  { title: 'Verify contract before payment', desc: 'Ask for a "Contrato de Arrendamento" registered with AT.' },
                  { title: 'Move in and keep proof of address', desc: 'Save the contract PDF; you will need it for other processes.' }
                ].map((s, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-ink mb-1">{s.title}</h4>
                      <p className="text-sm text-text-muted leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Risks & Common Mistakes */}
            <section className="bg-red-50 p-8 rounded-[2.5rem] border border-red-100">
              <h3 className="text-xl font-bold text-red-900 mb-6 flex items-center gap-2">
                <AlertCircle size={24} /> Risks & Common Mistakes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Paying before viewing (unless via verified platforms)',
                  'Fake listings on social media',
                  'Transfers via Western Union/Wise outside official apps',
                  'Landlords refusing to provide a legal contract'
                ].map((risk, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-red-800 font-medium">
                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-red-500 text-[10px] shrink-0 mt-0.5">X</span>
                    {risk}
                  </div>
                ))}
              </div>
            </section>

            {/* Tips Section */}
            <section className="bg-teal-50 p-8 rounded-[2.5rem] border border-teal-100">
              <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                <Info size={24} /> Pro Tips
              </h3>
              <ul className="space-y-4">
                {[
                  'Use verified platforms like Uniplaces or Spotahome for your first month.',
                  'Avoid sending money to individuals you haven\'t met or without a legal contract.',
                  'Always request an official contract (Contrato de Arrendamento).'
                ].map((tip, i) => (
                  <li key={i} className="flex gap-3 text-sm text-teal-900 font-medium leading-relaxed">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </section>

            {/* Final AI Call to Action */}
            <div className="bg-ink p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-4">Still unsure about a listing?</h3>
                  <p className="text-gray-400 text-sm mb-8 leading-relaxed max-w-md">Our AI can analyze listing descriptions or emails from landlords to check for potential red flags and keep you safe.</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-primary/20 text-xs">Help me find safe housing</button>
                    <button className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl transition-all text-xs border border-white/10">Is this listing a scam?</button>
                  </div>
                </div>
                <div className="w-32 h-32 bg-white/5 rounded-3xl backdrop-blur-md flex items-center justify-center p-6 border border-white/10">
                  <MessageCircle size={64} className="text-primary-light" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'consulate-reg':
        return (
          <div className="space-y-10">
            <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-text-muted leading-relaxed">
                Consular registration is the process of informing your home country's embassy or consulate that you are living in Portugal. This ensures you can receive consular assistance, renew your passport locally, and participate in your home country's elections while abroad.
              </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle2 size={24} className="text-primary" />
                  Requirements
                </h3>
                <ul className="space-y-4">
                  {[
                    'Valid Passport',
                    'Portuguese NIF',
                    'Proof of Address in Portugal',
                    'Completed Application Form (from your embassy)'
                  ].map((req, i) => (
                    <li key={i} className="flex gap-3 text-text-main items-center text-sm font-medium">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {req}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Info size={24} className="text-primary" />
                  Why is it important?
                </h3>
                <div className="space-y-4 text-sm text-text-muted">
                  <p>• <strong>Emergencies:</strong> The embassy can contact you or your family in case of crisis.</p>
                  <p>• <strong>Documents:</strong> Get a new passport without flying back home.</p>
                  <p>• <strong>Voting:</strong> Ensure you can vote in national elections from the consulate.</p>
                </div>
              </section>
            </div>

            <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
              <h3 className="text-xl font-bold mb-6">Process</h3>
              <div className="space-y-6 text-sm">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                  <p>Find your embassy's official website for "Consular Registration" or "Registro Consular".</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                  <p>Many countries now allow online registration through dedicated portals.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                  <p>If not online, you may need to book an appointment or send documents by mail.</p>
                </div>
              </div>
            </section>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8 pb-20">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-text-muted hover:text-primary font-bold transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Journey
      </button>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-widest">{task.category}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="text-text-muted text-[10px] font-bold uppercase tracking-widest">{task.timeEstimate}</span>
          </div>
          <h1 className="text-4xl font-extrabold text-text-main mb-2 tracking-tight">{task.title}</h1>
          <p className="text-text-muted text-lg mb-6">{task.description}</p>

          {isRestricted && (
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 mb-6 animate-in slide-in-from-left-4 duration-500">
              <AlertCircle size={20} className="text-amber-600 shrink-0" />
              <p className="text-xs text-amber-800 leading-relaxed font-medium">
                You’ll need a valid visa before applying for {task.title} or starting certain services.
                Please ensure your visa is approved before proceeding.
              </p>
            </div>
          )}

          {(taskId === 'nif' || taskId === 'aima-appointment') && (
            <div className={`space-y-4 ${isRestricted ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Choose how you want to proceed</p>
                <div className="inline-flex p-1 bg-gray-100 rounded-xl w-fit">
                  <button
                    onClick={() => setServiceType('assisted')}
                    className={`px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${serviceType === 'assisted' ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:text-ink'}`}
                  >
                    Assisted Service <Sparkles size={14} className={serviceType === 'assisted' ? 'text-white' : 'text-primary'} />
                  </button>
                  <button
                    onClick={() => setServiceType('self')}
                    className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${serviceType === 'self' ? 'bg-white text-ink shadow-sm' : 'text-gray-500 hover:text-ink'}`}
                  >
                    Self-Service
                  </button>
                </div>
              </div>
              <p className="text-xs text-text-muted italic">
                Do it yourself with guidance, or let us handle everything for you—faster and stress-free.
              </p>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-3xl border border-teal-50 shadow-soft min-w-[240px]">
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">CURRENT STATUS</p>
          <div className="flex flex-col gap-2">
            {(['Not Started', 'In Progress', 'Completed'] as TaskStatus[]).map(status => (
              <button
                key={status}
                onClick={() => onUpdateStatus(taskId, status)}
                className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all border text-left flex items-center justify-between ${task.status === status
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                    : 'bg-white text-text-muted border-gray-100 hover:bg-teal-50'
                  }`}
              >
                {status}
                {task.status === status && <CheckCircle2 size={14} />}
              </button>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <button
              onClick={() => setShowAIHelp(!showAIHelp)}
              className={`w-full font-bold text-xs py-3 rounded-xl transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 ${showAIHelp ? 'bg-ink text-white' : 'bg-accent text-white shadow-accent/20'
                }`}
            >
              <HelpCircle size={14} />
              {showAIHelp ? 'Close Advice' :
                taskId === 'bank-account' ? 'Which bank?' :
                  taskId === 'aima-appointment' ? 'Help prepare' :
                    taskId === 'housing-search' ? 'Check listing' : 'Explain Step'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'DIFFICULTY', value: task.difficulty, icon: AlertCircle },
          { label: 'EST. TIME', value: task.timeEstimate, icon: Clock },
          { label: 'IMPORTANCE', value: task.importance, icon: Info },
          { label: 'COST', value: task.cost, icon: Landmark }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-[2rem] border border-teal-50 shadow-soft">
            <div className="text-primary mb-3">
              <stat.icon size={20} />
            </div>
            <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="font-bold text-text-main text-sm">{stat.value}</p>
          </div>
        ))}
      </div>

      {showAIHelp && (
        <section className="bg-ink p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <MessageCircle size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">AI Relocation Assistant</span>
            </div>
            <h3 className="text-xl font-bold">More details about {task.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">
              {taskId === 'nif' && "The NIF is essentially your identity in the eyes of the Portuguese tax system. While you can get a temporary one as a tourist, for long-term residency, you must eventually update it with a Portuguese address once you have a rental contract. This confirms your status as a tax resident."}
              {taskId === 'phone-number' && "Portuguese telecom markets are competitive. Look for 'MEO', 'NOS', or 'Vodafone' for reliable fiber, but for mobile, 'Woo' and 'Digi' are disrupting the market with much lower prices and no contracts."}
              {taskId === 'bank-account' && "Portuguese banks are very strict about KYC (Know Your Customer). If you are an American citizen, expect extra paperwork due to FATCA. Students can often get fees waived if they show proof of university enrollment."}
              {taskId === 'housing-search' && "The housing market in Portugal is fast. Listings often disappear within 24 hours. If you're on Uniplaces, keep in mind they verify landlords, which adds a layer of safety. For Idealista, always filter for 'Individual' if you want to avoid agency fees, or 'Agência' for more formal support."}
              {taskId === 'aima-appointment' && "AIMA is the successor to SEF. The transition has caused significant backlogs. If your visa is expiring and you haven't heard back, your visa is legally extended until June 2025 by government decree (check for latest updates)."}
              {!['nif', 'phone-number', 'bank-account', 'aima-appointment'].includes(taskId) && "This step is part of your integration journey. Ensure you have all digital copies of your documents saved in a secure cloud storage, as you may be asked for them multiple times."}
            </p>
            <div className="pt-4 flex gap-4">
              <button className="text-[10px] font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
                Book a consultation
              </button>
              <button className="text-[10px] font-bold bg-primary text-white px-4 py-2 rounded-lg transition-colors">
                Ask specific question
              </button>
            </div>
          </div>
        </section>
      )}

      {renderTaskContent()}
    </div>
  );
}
