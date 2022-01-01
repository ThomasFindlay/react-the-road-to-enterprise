import { useState, useCallback } from 'react'

export const useStepper = (initialStep = 1, maxSteps?: number) => {
  const [step, setStep] = useState(initialStep)

  const nextStep = useCallback(() => {
    setStep((step) => {
      if (maxSteps) {
        const nextStep = step + 1
        return nextStep > maxSteps ? step : nextStep
      }
      return step + 1
    })
  }, [maxSteps])

  const prevStep = useCallback(() => {
    setStep((step) => {
      if (step === 1) return 1
      return step - 1
    })
  }, [])

  return {
    step,
    setStep,
    nextStep,
    prevStep,
  }
}
