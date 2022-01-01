import Input from '@/components/common/form/Input'
import { useFormContext } from 'react-hook-form'

type BodyHeightProps = {}

const BodyHeight = (props: BodyHeightProps) => {
  const { register, watch } = useFormContext()
  const heightUnit = watch('height.unit')

  return (
    <div className="space-y-4">
      <h2>What's your height?</h2>

      {heightUnit === 'cm' ? (
        <Input
          id="height"
          label="Centimiters"
          {...register('height.value.cm')}
        />
      ) : (
        <div className="flex gap-4">
          <Input
            id="height-feet"
            label="Feet"
            {...register('height.value.feet')}
          />
          <Input
            id="height-inches"
            label="Inches"
            {...register('height.value.inches')}
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
          />
          ft/inch
        </label>
      </div>
    </div>
  )
}

export default BodyHeight
