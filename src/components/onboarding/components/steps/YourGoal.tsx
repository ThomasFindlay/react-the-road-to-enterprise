import RadioGroup from '@/components/common/form/RadioGroup'
import { useFormContext } from 'react-hook-form'

type YourGoalProps = {}

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
  const { register } = useFormContext()

  return (
    <div className="space-y-4">
      <h2>What's your goal?</h2>
      <RadioGroup.Root>
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
  )
}

export default YourGoal
