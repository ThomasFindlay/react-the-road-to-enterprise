import Input from '@/components/common/form/Input'
import { useFormContext } from 'react-hook-form'

type BodyWeightProps = {}

const BodyWeight = (props: BodyWeightProps) => {
  const { register, watch } = useFormContext()
  const weightUnit = watch('weight.unit')

  return (
    <div className="space-y-4">
      <h2>What's your weight?</h2>

      {weightUnit === 'kg' ? (
        <Input id="weight" label="Kilograms" {...register('weight.value.kg')} />
      ) : (
        <div className="flex gap-4">
          <Input
            id="weight-feet"
            label="Stones"
            {...register('weight.value.st')}
          />
          <Input
            id="weight-inches"
            label="Pounds"
            {...register('weight.value.lbs')}
          />
        </div>
      )}

      <div className="w-full flex items-center justify-between">
        <label htmlFor="weight-unit-kg">
          <input
            className="mr-2"
            id="weight-unit-kg"
            type="radio"
            value="kg"
            {...register('weight.unit')}
          />
          kg
        </label>
        <label htmlFor="weight-unit-stones-pounds">
          <input
            className="mr-2"
            id="weight-unit-stones-pounds"
            type="radio"
            value="st/lbs"
            {...register('weight.unit')}
          />
          st/lbs
        </label>
      </div>
    </div>
  )
}

export default BodyWeight
