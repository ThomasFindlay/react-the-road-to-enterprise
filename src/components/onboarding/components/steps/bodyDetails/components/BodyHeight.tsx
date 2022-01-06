import Input from '@/components/common/form/Input'
import { OnboardingFormData } from '@/components/onboarding/onboardingSchema'
import { useFormContext } from 'react-hook-form'
import { getErrorProps } from '@/helpers'

type BodyHeightProps = {}

const BodyHeight = (props: BodyHeightProps) => {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
    clearErrors,
  } = useFormContext<OnboardingFormData>()
  const heightUnit = watch('height.unit')

  return (
    <>
      <div className="space-y-4">
        <h2>What's your height?</h2>

        {heightUnit === 'cm' ? (
          <Input
            id="height"
            label="Centimiters"
            type="number"
            {...register('height.value.cm', {
              valueAsNumber: true,
            })}
            {...getErrorProps(errors.height?.value, 'cm')}
          />
        ) : (
          <div className="flex gap-4">
            <Input
              id="height-feet"
              label="Feet"
              type="number"
              {...register('height.value.feet', {
                valueAsNumber: true,
              })}
              {...getErrorProps(errors.height?.value, 'feet')}
            />
            <Input
              id="height-inches"
              label="Inches"
              type="number"
              {...register('height.value.inches', {
                valueAsNumber: true,
              })}
              {...getErrorProps(errors.height?.value, 'inches')}
            />
          </div>
        )}

        <div className="w-full flex items-center justify-between">
          <label htmlFor="height-unit-cm">
            <input
              className="mr-2"
              id="height-unit-cm"
              type="radio"
              value="cm"
              {...register('height.unit')}
              onChange={(e) => {
                setValue('height.unit', e.target.value as 'cm')
                clearErrors(['height.value.feet', 'height.value.inches'])
              }}
            />
            cm
          </label>
          <label htmlFor="height-unit-feet-inches">
            <input
              className="mr-2"
              id="height-unit-feet-inches"
              type="radio"
              value="feet/inches"
              {...register('height.unit')}
              onChange={(e) => {
                setValue('height.unit', e.target.value as 'feet/inches')
                clearErrors('height.value.cm')
              }}
            />
            ft/inch
          </label>
        </div>
      </div>
    </>
  )
}

export default BodyHeight
