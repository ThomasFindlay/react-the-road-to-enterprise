import Input from '@/components/common/form/Input'
import { useFormContext } from 'react-hook-form'

type BodyHeightProps = {}

const BodyHeight = (props: BodyHeightProps) => {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
    clearErrors,
  } = useFormContext()
  const heightUnit = watch('height.unit')

  return (
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
          error={!!errors.height?.value?.cm}
          errorMessage={errors.height?.value?.cm?.message}
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
            error={!!errors.height?.value?.feet}
            errorMessage={errors.height?.value?.feet?.message}
          />
          <Input
            id="height-inches"
            label="Inches"
            type="number"
            {...register('height.value.inches', {
              valueAsNumber: true,
            })}
            error={!!errors.height?.value?.inches}
            errorMessage={errors.height?.value?.inches?.message}
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
              setValue('height.unit', e.target.value)
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
              setValue('height.unit', e.target.value)
              clearErrors('height.value.cm')
            }}
          />
          ft/inch
        </label>
      </div>
    </div>
  )
}

export default BodyHeight
