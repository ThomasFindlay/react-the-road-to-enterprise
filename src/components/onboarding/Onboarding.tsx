import { useStepper } from '@/hooks/useStepper'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AccountInformation from './components/steps/AccountInformation'
import ActivityLevel from './components/steps/ActivityLevel'
import PersonalDetails from './components/steps/PersonalDetails'
import BodyDetails from './components/steps/bodyDetails/BodyDetails'
import YourGoal from './components/steps/YourGoal'
import TargetWeight from './components/steps/TargetWeight'
import OnboardingStepperActions from './components/OnboardingStepperActions'

import { OnboardingFormData, onboardingFormSchema } from './onboardingSchema'
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

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

const initialState: DeepPartial<OnboardingFormData> = {
  // name: 'Hello',
  weightGoal: 'gain-weight',
  height: {
    unit: 'cm',
    // value: {
    //   cm: 188,
    // },
  },
  weight: {
    unit: 'kg',
    value: {
      kg: 120,
    },
    // value: {
    //   st: 15,
    //   lbs: 10,
    // },
  },
  // targetWeight: {
  //   st: 25,
  //   lbs: 15,
  // },
}

const stepComponents = [
  AccountInformation,
  PersonalDetails,
  ActivityLevel,
  BodyDetails,
  YourGoal,
  TargetWeight,
]

const Onboarding = (props: OnboardingProps) => {
  const { step, nextStep, prevStep } = useStepper(4, MAX_STEPS)
  const methods = useForm<OnboardingFormData>({
    mode: 'onTouched',
    defaultValues: initialState,
    resolver: zodResolver(onboardingFormSchema),
  })
  const onSubmit: SubmitHandler<OnboardingFormData> = (data) => {
    console.log('on submit', data)
  }

  const CurrentStepComponent = stepComponents[step - 1]

  return (
    <div className="container mx-auto p-6">
      <h2 className="mb-6 text-2xl">Fitness App Onboarding</h2>
      <FormProvider {...methods}>
        <form
          className="w-1/2 shadow bg-white border border-coolGray-200 p-6 mx-auto my-4"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <CurrentStepComponent
            actions={(isValid: () => Promise<boolean>) => {
              return (
                <OnboardingStepperActions
                  step={step}
                  prevStep={prevStep}
                  nextStep={nextStep}
                  isValid={isValid}
                  maxSteps={MAX_STEPS}
                />
              )
            }}
          />
        </form>
      </FormProvider>
    </div>
  )
}

export default Onboarding
