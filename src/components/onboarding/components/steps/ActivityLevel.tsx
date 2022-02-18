import RadioGroup from '@/components/common/form/RadioGroup'
import { getErrorProps } from '@/helpers'
import { useFormContext } from 'react-hook-form'
import { Actions } from '../../Onboarding.types'
import { OnboardingFormData } from '../../onboardingSchema'

type ActivityLevelProps = {
  actions: Actions
}

const activityOptions = [
  {
    id: 'not-very-active',
    value: 'not-very-active',
    label: 'Not very active',
  },
  {
    id: 'lightly-active',
    value: 'lightly-active',
    label: 'Lightly Active',
  },
  {
    id: 'active',
    value: 'active',
    label: 'Active',
  },
  {
    id: 'very-active',
    value: 'very-active',
    label: 'Very active',
  },
]

const ActivityLevel = (props: ActivityLevelProps) => {
  const { actions } = props
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext<OnboardingFormData>()
  const isValid = () => trigger(['activityLevel'])
  return (
    <>
      <div className="space-y-4">
        <h2>How active are you?</h2>
        <RadioGroup.Root {...getErrorProps(errors.activityLevel)}>
          {activityOptions.map((option) => {
            const { id, value, label } = option
            return (
              <RadioGroup.Item
                id={id}
                key={id}
                label={label}
                value={value}
                {...register('activityLevel')}
              />
            )
          })}
        </RadioGroup.Root>
      </div>
      {actions(isValid)}
    </>
  )
}

export default ActivityLevel
