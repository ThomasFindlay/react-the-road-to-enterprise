import Input from '@/components/common/form/Input'
import { useFormContext } from 'react-hook-form'

type TargetWeightProps = {}

const TargetWeight = (props: TargetWeightProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext()

  const weightUnit = watch('weight.unit')

  return (
    <div className="space-y-4">
      <h2>What's your target weight?</h2>
      {weightUnit === 'kg' ? (
        <Input
          id="weight"
          label="Kilograms"
          {...register('targetWeight.value.kg', {
            valueAsNumber: true,
          })}
          error={!!errors.targetWeight?.kg}
          errorMessage={errors.targetWeight?.kg?.message}
        />
      ) : (
        <div className="flex gap-4">
          <Input
            id="weight-feet"
            label="Stones"
            type="number"
            {...register('targetWeight.st', {
              valueAsNumber: true,
            })}
            error={!!errors.targetWeight?.st}
            errorMessage={errors.targetWeight?.st?.message}
          />
          <Input
            id="weight-inches"
            label="Pounds"
            type="number"
            {...register('targetWeight.lbs', {
              valueAsNumber: true,
            })}
            error={!!errors.targetWeight?.lbs}
            errorMessage={errors.targetWeight?.lbs?.message}
          />
        </div>
      )}
    </div>
  )
}

export default TargetWeight
