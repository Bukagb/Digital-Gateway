import React from 'react';
import { UserProfile } from '../../types';
import { OnboardingLayout } from './components/OnboardingLayout';
import { useOnboarding } from './hooks/useOnboarding';
import { StepProps } from './types';

import { Step1AccountSetup } from './steps/Step1AccountSetup';
import { Step2Purpose } from './steps/Step2Purpose';
import { Step3Country } from './steps/Step3Country';
import { Step4VisaStage } from './steps/Step4VisaStage';
import { Step5ApplicationSupport } from './steps/Step5ApplicationSupport';
import { Step6Settlement } from './steps/Step6Settlement';
import { Step7Communities } from './steps/Step7Communities';

interface OnboardingProps {
  onComplete: (data: UserProfile, targetPage?: any) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const onboardingState = useOnboarding(onComplete);

  const stepProps: StepProps = onboardingState;

  const renderStep = () => {
    switch (onboardingState.step) {
      case 1:
        return <Step1AccountSetup {...stepProps} />;
      case 2:
        return <Step2Purpose {...stepProps} />;
      case 3:
        return <Step3Country {...stepProps} />;
      case 4:
        return <Step4VisaStage {...stepProps} />;
      case 5:
        return <Step5ApplicationSupport {...stepProps} />;
      case 6:
        return <Step6Settlement {...stepProps} />;
      case 7:
        return <Step7Communities {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <OnboardingLayout step={onboardingState.step} prevStep={onboardingState.prevStep}>
      {renderStep()}
    </OnboardingLayout>
  );
}
