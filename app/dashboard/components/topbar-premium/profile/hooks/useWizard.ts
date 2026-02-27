"use client";

import { useCallback, useState } from "react";

export default function useWizard(maxStep: number = 3) {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = useCallback(() => {
    setCurrentStep((s) => (s < maxStep ? s + 1 : s));
  }, [maxStep]);

  const prevStep = useCallback(() => {
    setCurrentStep((s) => (s > 1 ? s - 1 : s));
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(1);
  }, []);

  return {
    currentStep,
    maxStep,
    nextStep,
    prevStep,
    reset,
  };
}
