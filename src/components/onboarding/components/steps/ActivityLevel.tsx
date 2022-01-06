import RadioGroup from '@/components/common/form/RadioGroup'
import { useFormContext } from 'react-hook-form'
import { OnboardingFormData } from '../../onboardingSchema'

type ActivityLevelProps = {}

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
  const {
    register,
    formState: { errors },
  } = useFormContext<OnboardingFormData>()

  return (
    <div className="space-y-4">
      <h2>How active are you?</h2>
      <RadioGroup.Root>
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
      {errors.activityLevel ? <p>{errors.activityLevel.message}</p> : null}
    </div>
  )
}

export default ActivityLevel
