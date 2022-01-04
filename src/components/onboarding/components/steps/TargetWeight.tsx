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
          type="number"
          {...register('targetWeight.value.kg', {
            valueAsNumber: true,
          })}
          error={!!errors.targetWeight?.value?.kg}
          errorMessage={errors.targetWeight?.value?.kg?.message}
        />
      ) : (
        <div className="flex gap-4">
          <Input
            id="weight-feet"
            label="Stones"
            type="number"
            {...register('targetWeight.value.st', {
              valueAsNumber: true,
            })}
            error={!!errors.targetWeight?.value?.st}
            errorMessage={errors.targetWeight?.value?.st?.message}
          />
          <Input
            id="weight-inches"
            label="Pounds"
            type="number"
            {...register('targetWeight.value.lbs', {
              valueAsNumber: true,
            })}
            error={!!errors.targetWeight?.value?.lbs}
            errorMessage={errors.targetWeight?.value?.lbs?.message}
          />
        </div>
      )}
    </div>
  )
}

export default TargetWeight
