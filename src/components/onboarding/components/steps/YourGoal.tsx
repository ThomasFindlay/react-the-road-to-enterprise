import RadioGroup from '@/components/common/form/RadioGroup'
import { getErrorProps } from '@/helpers'
import { useFormContext } from 'react-hook-form'
import { Actions } from '../../Onboarding.types'
import { OnboardingFormData } from '../../onboardingSchema'

type YourGoalProps = {
  actions: Actions
}

const goalOptions = [
  {
    id: 'lose-weight',
    value: 'lose-weight',
    label: 'Lose Weight',
  },
  {
    id: 'maintain-weight',
    value: 'maintain-weight',
    label: 'Maintain Weight',
  },
  {
    id: 'gain-weight',
    value: 'gain-weight',
    label: 'Gain Weight',
  },
]

const YourGoal = (props: YourGoalProps) => {
  const { actions } = props
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<OnboardingFormData>()

  const isValid = () => trigger(['weightGoal'])
  return (
    <>
      <div className="space-y-4">
        <h2>What's your goal?</h2>
        <RadioGroup.Root {...getErrorProps(errors.weightGoal)}>
          {goalOptions.map((option) => {
            const { id, value, label } = option
            return (
              <RadioGroup.Item
                id={id}
                key={id}
                value={value}
                label={label}
                {...register('weightGoal')}
              />
            )
          })}
        </RadioGroup.Root>
      </div>
      {actions(isValid)}
    </>
  )
}

export default YourGoal
