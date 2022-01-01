import Input from '@/components/common/form/Input'
import { useFormContext } from 'react-hook-form'

type TargetWeightProps = {}

const TargetWeight = (props: TargetWeightProps) => {
  const { register, watch } = useFormContext()
  const weightUnit = watch('weight.unit')

  return (
    <div className="space-y-4">
      <h2>What's your target weight?</h2>
      {weightUnit === 'kg' ? (
        <Input
          id="weight"
          label="Kilograms"
          {...register('targetWeight.value.kg')}
        />
      ) : (
        <div className="flex gap-4">
          <Input
            id="weight-feet"
            label="Stones"
            {...register('targetWeight.value.st')}
          />
          <Input
            id="weight-inches"
            label="Pounds"
            {...register('targetWeight.value.lbs')}
          />
        </div>
      )}
    </div>
  )
}

export default TargetWeight
