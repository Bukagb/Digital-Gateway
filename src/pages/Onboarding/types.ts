import { UserProfile } from '../../types';

export interface StepProps {
  formData: Partial<UserProfile>;
  updateForm: (data: Partial<UserProfile>) => void;
  nextStep: () => void;
  prevStep: () => void;
  onComplete: (data: UserProfile, targetPage?: any) => void;
  
  // Local state managed by the parent Onboarding component
  nationalityQuery: string;
  setNationalityQuery: (q: string) => void;
  applyingFromQuery: string;
  setApplyingFromQuery: (q: string) => void;
  matchingQuestionsStep: number;
  setMatchingQuestionsStep: (s: number) => void;
  setStep: (s: number) => void;
  uploadedDocs: string[];
  setUploadedDocs: (docs: string[]) => void;
  aiReviewStarted: boolean;
  setAiReviewStarted: (s: boolean) => void;
  aiReviewCompleted: boolean;
  setAiReviewCompleted: (c: boolean) => void;
  handleUpload: (id: string) => void;
  startAiReview: () => void;
  getRecommendedVisa: () => any;
}
