import Input from '@/components/common/form/Input'
import { OnboardingFormData } from '@/components/onboarding/onboardingSchema'
import { getErrorProps } from '@/helpers'
import { useFormContext } from 'react-hook-form'

type BodyWeightProps = {}

const BodyWeight = (props: BodyWeightProps) => {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
    clearErrors,
  } = useFormContext<OnboardingFormData>()

  const weightUnit = watch('weight.unit')

  return (
    <div className="space-y-4">
      <h2>What's your weight?</h2>

      {weightUnit === 'kg' ? (
        <Input
          id="weight"
          label="Kilograms"
          type="number"
          {...register('weight.value.kg', {
            valueAsNumber: true,
          })}
          {...getErrorProps(errors.weight?.value, 'kg')}
        />
      ) : (
        <div className="flex gap-4">
          <Input
            id="weight-feet"
            label="Stones"
            type="number"
            {...register('weight.value.st', {
              valueAsNumber: true,
            })}
            {...getErrorProps(errors.weight?.value, 'st')}
          />
          <Input
            id="weight-inches"
            label="Pounds"
            type="number"
            {...register('weight.value.lbs', {
              valueAsNumber: true,
            })}
            {...getErrorProps(errors.weight?.value, 'lbs')}
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
            onChange={(e) => {
              setValue('weight.unit', e.target.value as 'kg')
              clearErrors(['weight.value.st', 'weight.value.lbs'])
            }}
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
            onChange={(e) => {
              setValue('weight.unit', e.target.value as 'st/lbs')
              clearErrors(['weight.value.kg'])
            }}
          />
          st/lbs
        </label>
      </div>
    </div>
  )
}

export default BodyWeight
