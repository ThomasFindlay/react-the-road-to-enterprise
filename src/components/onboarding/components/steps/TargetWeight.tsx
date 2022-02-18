import Input from '@/components/common/form/Input'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { getErrorProps } from '@/helpers/getErrorProps'
import { OnboardingFormData } from '../../onboardingSchema'
import { Actions } from '../../Onboarding.types'
import { handleCompareKg, handleCompareStLbs } from './helpers/compareWeight'

type TargetWeightProps = {
  actions: Actions
}

const TargetWeight = (props: TargetWeightProps) => {
  const { actions } = props
  const {
    register,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext<OnboardingFormData>()

  const weightUnit = watch('weight.unit')
  const weightGoal = watch('weightGoal')
  const [weightKg, weightSt, weightLbs] = watch([
    'weight.value.kg',
    'weight.value.st',
    'weight.value.lbs',
  ])
  const [targetWeightKg, targetWeightSt, targetWeightLbs] = watch([
    'targetWeight.value.kg',
    'targetWeight.value.st',
    'targetWeight.value.lbs',
  ])

  const [weightMismatchError, setWeightMismatchError] = useState('')

  useEffect(() => {
    let error = ''
    if (weightUnit === 'kg') {
      error = handleCompareKg({ weightGoal, weightKg, targetWeightKg })
    } else if (weightUnit === 'st/lbs') {
      error = handleCompareStLbs({
        weightGoal,
        weightSt,
        weightLbs,
        targetWeightSt,
        targetWeightLbs,
      })
    }

    setWeightMismatchError(error)
  }, [targetWeightKg, targetWeightSt, targetWeightLbs, weightUnit])

  const isValid = () => trigger(['targetWeight'])

  return (
    <>
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
            {...getErrorProps(errors.targetWeight?.value, 'kg')}
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
              {...getErrorProps(errors.targetWeight?.value, 'st')}
            />
            <Input
              id="weight-inches"
              label="Pounds"
              type="number"
              {...register('targetWeight.value.lbs', {
                valueAsNumber: true,
              })}
              {...getErrorProps(errors.targetWeight?.value, 'lbs')}
            />
          </div>
        )}
        {!errors.targetWeight && weightMismatchError ? (
          <div className="text-left -translate-y-2">
            <span className="text-red-500 ">{weightMismatchError}</span>
          </div>
        ) : null}
      </div>
      {actions(isValid)}
    </>
  )
}

export default TargetWeight
