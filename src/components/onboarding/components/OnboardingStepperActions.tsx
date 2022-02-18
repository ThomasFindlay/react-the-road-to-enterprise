export type OnboardingActionsProps = {
  step: number
  prevStep: () => void
  nextStep: () => void
  maxSteps: number
  isValid: () => Promise<boolean>
}

const OnboardingActions = (props: OnboardingActionsProps) => {
  const { step, prevStep, nextStep, maxSteps, isValid } = props

  const onNextStep = async () => {
    if (!(await isValid())) return
    nextStep()
  }

  return (
    <div className="flex justify-between mt-6">
      <button
        className="px-4 py-2 shadow font-semibold border border-coolGray-200 hover:bg-coolGray-100 disabled:bg-coolGray-200 disabled:cursor-not-allowed disabled:text-gray-50"
        type="button"
        disabled={step === 1}
        onClick={prevStep}
      >
        Back
      </button>
      {step !== maxSteps ? (
        <button
          className="px-4 py-2 shadow border border-indigo-200 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 font-semibold"
          type="button"
          onClick={onNextStep}
        >
          Next
        </button>
      ) : (
        <button
          className="px-4 py-2 shadow border border-indigo-200 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 font-semibold"
          type="submit"
        >
          Submit
        </button>
      )}
    </div>
  )
}

export default OnboardingActions
