import { useState, useCallback } from 'react';
import { UserProfile } from '../../../types';
import { VISA_DATA } from '../../../constants/visaData';

export function useOnboarding(onComplete: (data: UserProfile, targetPage?: any) => void) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '',
    gender: '',
    nationality: '',
    email: '',
    applyingFromCountry: '',
    visaStatus: '',
    visaStage: '',
    university: '',
    arrivalDate: '',
    city: '',
    motivation: '',
    language: 'English',
    isOnboarded: false,
    documentsReady: {},
    accommodationStatus: '',
    airportArrivalDetails: '',
    remoteWork: false,
    familyJoining: false,
    plannedStay: ''
  });

  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);
  const [aiReviewStarted, setAiReviewStarted] = useState(false);
  const [aiReviewCompleted, setAiReviewCompleted] = useState(false);
  const [matchingQuestionsStep, setMatchingQuestionsStep] = useState(0);
  const [nationalityQuery, setNationalityQuery] = useState('');
  const [applyingFromQuery, setApplyingFromQuery] = useState('');

  const nextStep = useCallback(() => setStep(s => s + 1), []);
  const prevStep = useCallback(() => setStep(s => s - 1), []);

  const updateForm = useCallback((data: Partial<UserProfile>) => {
    setFormData(prev => ({ ...prev, ...data }));
  }, []);

  const handleUpload = useCallback((id: string) => {
    setUploadedDocs(prev => prev.includes(id) ? prev : [...prev, id]);
  }, []);

  const startAiReview = useCallback(() => {
    setAiReviewStarted(true);
    setTimeout(() => {
      setAiReviewCompleted(true);
    }, 2000);
  }, []);

  const getRecommendedVisa = useCallback(() => {
    if (formData.motivation === 'Study') return VISA_DATA['Study'];
    if (formData.motivation === 'Work') return VISA_DATA['Work'];
    if (formData.motivation === 'Relocation') return VISA_DATA['Relocation'];
    if (formData.motivation === 'Family') return VISA_DATA['Family'];
    return VISA_DATA['Study']; // Default
  }, [formData.motivation]);

  return {
    step,
    setStep,
    formData,
    updateForm,
    nextStep,
    prevStep,
    onComplete,
    nationalityQuery,
    setNationalityQuery,
    applyingFromQuery,
    setApplyingFromQuery,
    matchingQuestionsStep,
    setMatchingQuestionsStep,
    uploadedDocs,
    setUploadedDocs,
    aiReviewStarted,
    setAiReviewStarted,
    aiReviewCompleted,
    setAiReviewCompleted,
    handleUpload,
    startAiReview,
    getRecommendedVisa
  };
}
