import Input from '@/components/common/form/Input'
import React from 'react'
import { useFormContext } from 'react-hook-form'

type BodyHeightProps = {}

const BodyHeight = (props: BodyHeightProps) => {
  const {
    register,
    watch,
    formState: { errors },
    trigger,
    setValue,
    clearErrors,
  } = useFormContext()
  const heightUnit = watch('height.unit')
  console.log('height errors', errors)
  const heightValue = watch('height.value')
  console.log('hei val', heightValue)
  return (
    <div className="space-y-4">
      <h2>What's your height?</h2>

      {heightUnit === 'cm' ? (
        <Input
          id="height"
          label="Centimiters"
          name="height.value.cm"
          onBlur={(e) => {
            trigger('height.value.cm')
          }}
          onChange={(e) => {
            setValue('height.value.cm', e.target.value)
          }}
          ref={(ref) => {
            if (ref) {
              register('height.value.cm')
            }
          }}
          error={!!errors.height?.value.cm}
          errorMessage={errors.height?.value?.cm?.message}
        />
      ) : (
        <div className="flex gap-4">
          <Input
            id="height-feet"
            label="Feet"
            onBlur={() => {
              trigger('height.value.feet')
            }}
            onChange={(e) => {
              setValue('height.value.feet', e.target.value)
            }}
            ref={(ref) => ref && register('height.value.feet')}
            error={!!errors.height?.value?.feet}
            errorMessage={errors.height?.value?.feet?.message}
          />
          <Input
            id="height-inches"
            label="Inches"
            {...register('height.value.inches')}
            onBlur={(e) => {
              trigger('height.value.inches')
            }}
            onChange={(e) => {
              setValue('height.value.inches', e.target.value)
            }}
            ref={(ref) => ref && register('height.value.inches')}
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
              console.log('clear errors!')
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
