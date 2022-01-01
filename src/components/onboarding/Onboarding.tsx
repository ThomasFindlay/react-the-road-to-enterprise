import { useStepper } from '@/hooks/useStepper'
import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import AccountInformation from './components/steps/AccountInformation'
import ActivityLevel from './components/steps/ActivityLevel'
import PersonalDetails from './components/steps/PersonalDetails'
import BodyDetails from './components/steps/bodyDetails/BodyDetails'
import YourGoal from './components/steps/YourGoal'
import TargetWeight from './components/steps/TargetWeight'

type OnboardingProps = {}
/**
 * Onboading
 *
 * 5 steps
 *
 * Account details
 *
 * - Email
 * - Password
 *
 * Personal details
 * - Name
 * - Date of birth
 * - Sex
 *
 * What is your goal?
 *  - Lose Weight
 *  - Maintain Weight
 *  - Gain Weight
 *
 * How active are you?
 *  - Not very active
 *  - Lightly active
 *  - Active
 *  - Very active
 *
 * How tall are you?
 * - cm, feet/inches
 *
 * How much do you weight?
 * - kg, st/lbs,
 *
 * What's your goal weight?
 *  - kg, st,lbs (Depending on what was selected for the goal, the target should be lower than current weight for lose weight, or higher for gain weight)
 */

const MAX_STEPS = 6

type HeightInCm = {
  unit: 'cm'
  value?: {
    cm: number
  }
}

type HeightInFeet = {
  unit: 'feet/inches'
  value?: {
    feet: number
    inches: number
  }
}

type WeightInKg = {
  unit: 'kg'
  value?: {
    kg: number
  }
}

type WeightInSt = {
  unit: 'st/lbs'
  value?: {
    st: number
    lbs: number
  }
}

type OnboardingFormData = {
  email: string
  password: string
  name: string
  dateOfBirth: string
  gender: 'male' | 'female'
  weightGoal: 'maintain-weight' | 'lose-weight' | 'gain-weight'
  activityLevel: 'not-very-active' | 'lightly-active' | 'active' | 'very-active'
  height: HeightInCm | HeightInFeet
  weight: WeightInKg | WeightInSt
  targetWeight: WeightInKg['value'] | WeightInSt['value']
}

const initialState: Partial<OnboardingFormData> = {
  email: 'test@gmail.com',
  password: 'password',
  name: 'Thomas',
  height: {
    unit: 'cm',
  },
  weight: {
    unit: 'kg',
  },
}

const Onboarding = (props: OnboardingProps) => {
  const { step, nextStep, prevStep } = useStepper(6, MAX_STEPS)
  const methods = useForm<OnboardingFormData>({
    mode: 'onBlur',
    defaultValues: initialState,
  })

  const onSubmit: SubmitHandler<OnboardingFormData> = (data) => {
    console.log('on submit', data)
  }

  const onNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    nextStep()
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="mb-6 text-2xl">Fitness App Onboarding</h2>
      <FormProvider {...methods}>
        <form
          className="w-1/2 shadow bg-white border border-coolGray-200 p-6 mx-auto my-4"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {step === 1 ? <AccountInformation /> : null}
          {step === 2 ? <PersonalDetails /> : null}
          {step === 3 ? <YourGoal /> : null}
          {step === 4 ? <ActivityLevel /> : null}
          {step === 5 ? <BodyDetails /> : null}
          {step === 6 ? <TargetWeight /> : null}

          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 shadow font-semibold border border-coolGray-200 hover:bg-coolGray-100 disabled:bg-coolGray-200 disabled:cursor-not-allowed disabled:text-gray-50"
              disabled={step === 1}
              onClick={prevStep}
            >
              Back
            </button>
            {step !== MAX_STEPS ? (
              <button
                className="px-4 py-2 shadow border border-indigo-200 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 font-semibold"
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
        </form>
      </FormProvider>
    </div>
  )
}

export default Onboarding
