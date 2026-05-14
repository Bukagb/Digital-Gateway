import React from 'react';
import { motion } from 'motion/react';
import { Globe, FileSearch, CheckCircle2, Sparkles } from 'lucide-react';
import { StepProps } from '../types';
import { NavigationButton } from '../components/NavigationButtons';

export function Step6Settlement(props: StepProps) {
  const { formData, updateForm, nextStep, onComplete, getRecommendedVisa, uploadedDocs, setUploadedDocs, aiReviewStarted, setAiReviewStarted, aiReviewCompleted, setAiReviewCompleted, handleUpload, startAiReview } = props;

  // Path A: Already have visa (or Applied) -> Settlement Details
  if (formData.visaStage === 'Approved' || formData.visaStage === 'Applied') {
    if (formData.accommodationStatus === 'Searching' || formData.accommodationStatus === 'Need assistance') {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg space-y-8"
        >
          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-6">
              <Globe size={32} />
            </div>
            <h3 className="text-3xl font-bold text-ink">Let’s help you find safe housing</h3>
            <p className="text-text-muted">Browse verified student-friendly housing options in Portugal and secure your home before you land.</p>
          </div>

          <div className="space-y-3">
            <NavigationButton 
              onClick={() => onComplete({ ...formData, isOnboarded: true } as any, 'housing')} 
              text="Explore Housing"
            />
            <NavigationButton 
              onClick={nextStep} 
              text="Continue Later"
              variant="outline"
              icon={null}
            />
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="w-full max-w-lg space-y-8"
      >
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-ink">Settlement Details</h3>
          <p className="text-text-muted">Help us prepare your first few days in Portugal.</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-ink ml-1">Accommodation Status</label>
            <div className="grid grid-cols-1 gap-2">
              {['Already secured', 'Still searching / Need assistance'].map(s => (
                <button 
                  key={s}
                  onClick={() => updateForm({ accommodationStatus: s === 'Still searching / Need assistance' ? 'Searching' : s })}
                  className={`p-4 rounded-xl border text-left text-sm font-bold transition-all ${formData.accommodationStatus === (s === 'Still searching / Need assistance' ? 'Searching' : s) ? 'bg-primary/5 border-primary text-primary' : 'bg-white border-gray-100 text-text-muted hover:border-primary/20'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <NavigationButton 
          onClick={nextStep} 
          disabled={!formData.accommodationStatus} 
        />
      </motion.div>
    );
  }

  // Path B: AI Document Preparation (for others)
  const currentVisaForDocs = getRecommendedVisa();
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-lg space-y-8"
    >
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-ink">Check your visa documents</h3>
        <p className="text-text-muted">Reduce common mistakes and improve your document readiness before your embassy appointment.</p>
      </div>

      {!aiReviewStarted ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-3">
            {currentVisaForDocs.requiredDocuments.map((doc: any) => (
              <details key={doc.id} className="group border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:border-primary/10 transition-all">
                <summary className="p-4 cursor-pointer flex items-center justify-between group-hover:bg-gray-50/50">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${uploadedDocs.includes(doc.id) ? 'bg-primary/10 text-primary' : 'bg-gray-50 text-gray-400'}`}>
                      {uploadedDocs.includes(doc.id) ? <CheckCircle2 size={20} /> : <FileSearch size={20} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink">{doc.title}</p>
                      <p className="text-[10px] text-text-muted uppercase tracking-wider">{doc.desc}</p>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleUpload(doc.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${uploadedDocs.includes(doc.id) ? 'bg-primary/5 text-primary' : 'bg-primary text-white hover:bg-primary-dark'}`}
                  >
                    {uploadedDocs.includes(doc.id) ? 'Uploaded' : 'Upload'}
                  </button>
                </summary>
                <div className="px-4 pb-4 space-y-3">
                  <div className="p-3 bg-gray-50 rounded-xl space-y-2">
                    <p className="text-xs text-ink font-bold">Requirements:</p>
                    <p className="text-xs text-text-muted leading-relaxed">{doc.explanation}</p>
                  </div>
                  {formData.applyingFromCountry === 'Nigeria' && doc.id === 'criminal' && (
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                      <p className="text-[10px] font-bold text-amber-800 uppercase mb-1">Country-Specific Guidance (Nigeria)</p>
                      <p className="text-xs text-amber-800/80">Must be legalized at the Ministry of Foreign Affairs in Abuja before embassy submission.</p>
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>

          <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-primary">Readiness Score</p>
              <p className="text-xl font-black text-ink">{Math.round((uploadedDocs.length / currentVisaForDocs.requiredDocuments.length) * 100)}%</p>
            </div>
            <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-1000" 
                style={{ width: `${(uploadedDocs.length / currentVisaForDocs.requiredDocuments.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <NavigationButton 
            onClick={startAiReview} 
            disabled={uploadedDocs.length === 0}
            variant="secondary"
            text="Run AI Preparation Check"
            icon={<Sparkles size={20} className="text-primary-light" />}
          />
        </div>
      ) : !aiReviewCompleted ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="font-bold text-ink">Analyzing documents...</p>
          <p className="text-sm text-text-muted">Our AI is checking for compliance and quality.</p>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="space-y-6"
        >
          <div className="p-5 bg-white rounded-3xl border border-gray-100 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-50 pb-4">
              <h4 className="font-bold text-ink">AI Review Results</h4>
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-bold uppercase tracking-wider">Analysis Complete</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-4 p-3 bg-green-50 rounded-xl">
                <CheckCircle2 size={18} className="text-green-600 mt-0.5" />
                <p className="text-sm text-green-800 font-medium">Passport valid for 12 months (Compliant)</p>
              </div>
              {currentVisaForDocs.requiredDocuments.find((d: any) => d.id === 'criminal') && (
                <div className="flex items-start gap-4 p-3 bg-amber-50 rounded-xl border border-amber-100">
                  <Sparkles size={18} className="text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-amber-800 font-bold">Action Required: Criminal Record</p>
                    <p className="text-xs text-amber-800/80">The document is missing the mandatory legalization stamp.</p>
                    <button 
                      onClick={() => {
                        const newUploaded = uploadedDocs.filter(id => id !== 'criminal');
                        setUploadedDocs(newUploaded);
                        setAiReviewStarted(false);
                        setAiReviewCompleted(false);
                      }}
                      className="mt-2 text-xs font-bold text-amber-900 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-amber-200"
                    >
                      Re-upload Document
                    </button>
                  </div>
                </div>
              )}
              {currentVisaForDocs.requiredDocuments.find((d: any) => d.id === 'insurance') && (
                <div className="flex items-start gap-4 p-3 bg-red-50 rounded-xl border border-red-100">
                  <div className="w-4.5 h-4.5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5 text-red-600 text-[10px]">✕</div>
                  <div>
                    <p className="text-sm text-red-800 font-bold">Incorrect Coverage: Insurance</p>
                    <p className="text-xs text-red-800/80">Plan must explicitly state coverage for the entire Schengen area.</p>
                    <button 
                      onClick={() => {
                        const newUploaded = uploadedDocs.filter(id => id !== 'insurance');
                        setUploadedDocs(newUploaded);
                        setAiReviewStarted(false);
                        setAiReviewCompleted(false);
                      }}
                      className="mt-2 text-xs font-bold text-red-900 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-red-200"
                    >
                      Replace Insurance File
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-2">
            <NavigationButton 
              onClick={nextStep} 
              text="Continue to Community Matching"
            />
            <div className="grid grid-cols-2 gap-3">
              <NavigationButton 
                onClick={() => onComplete({ ...formData, isOnboarded: true } as any)} 
                text="Save Progress"
                variant="outline"
                icon={null}
              />
              <NavigationButton 
                onClick={() => onComplete({ ...formData, isOnboarded: true } as any)} 
                text="Go to Dashboard"
                variant="outline"
                icon={null}
              />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
