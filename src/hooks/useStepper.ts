import { useCallback, useState } from 'react'

export const useStepper = (initialStep = 1) => {
  const [step, setStep] = useState(initialStep)
  const goToNextStep = useCallback(() => setStep((step) => step + 1), [])
  const goToPrevStep = useCallback(() => setStep((step) => step - 1), [])

  return {
    step,
    setStep,
    goToNextStep,
    goToPrevStep,
  }
}
