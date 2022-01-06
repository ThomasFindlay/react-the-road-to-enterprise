import Input from '@/components/common/form/Input'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { get } from 'lodash-es'
import { getErrorProps } from '@/helpers/getErrorProps'
import { OnboardingFormData } from '../../onboardingSchema'

type TargetWeightProps = {}

const handleCompareKg = (
  weightGoal: OnboardingFormData['weightGoal'],
  weightValue: number,
  targetWeightValue: number
) => {
  // switch (weightGoal) {
  //   case 'gain-weight' && targetWeightValue < weightValue {
  //     console.log('check')
  //   }
  // }
  if (weightGoal === 'gain-weight' && targetWeightValue < weightValue) {
    return "Didn't you say you want to gain weight?"
  } else if (weightGoal === 'lose-weight' && targetWeightValue > weightValue) {
    return "Didn't you say you want to lose weight?"
  } else if (
    weightGoal === 'maintain-weight' &&
    (targetWeightValue > weightValue + 10 ||
      targetWeightValue < weightValue - 10)
  ) {
    return "Didn't you say you want to maintain weight?"
  }

  return ''
}
const handleCompareStLbs = (
  weightValue: number = 0,
  targetWeightValue: number = 0
) => {}

const TargetWeight = (props: TargetWeightProps) => {
  const {
    register,
    watch,
    formState: { errors },
    setError,
    clearErrors,
    getValues,
  } = useFormContext<OnboardingFormData>()
  const values = getValues()
  const weightUnit = watch('weight.unit')
  const weightGoal = watch('weightGoal')
  const weightValue = watch('weight.value')
  const targetWeightValue = watch('targetWeight.value')
  console.log('check', targetWeightValue, errors)
  // Use useMemo to derive custom errors
  useEffect(() => {
    if (
      weightUnit === 'kg' &&
      typeof weightValue === 'object' &&
      'kg' in weightValue
    ) {
      let error = handleCompareKg(
        weightGoal,
        weightValue.kg,
        (targetWeightValue as { kg: number })?.kg
      )
      console.log('compare kg', error)

      if (error) {
        clearErrors('targetWeight.value.kg')
        setError('targetWeight.value.kg', {
          message: error,
        })
      }
    } else {
      // handleCompareStLbs(weightValue, targetWeightValue)
    }
  }, [get(targetWeightValue, 'kg')])
  // const getErrorProps = <P extends unknown, A extends unknown>(
  //   path: P,
  //   ...paths: A[]
  // ) => {
  //   let value = path
  //   for (const p of paths) {
  //     if (typeof value === 'object') {

  //     }
  //   }

  //   return {
  //     error,
  //     errorMessage,
  //   }
  // }
  const extractErrorField = <
    T extends typeof errors.targetWeight,
    P extends string
  >(
    param: T,
    prop: P
  ) => {
    const value = param?.value
    if (!value) {
      return null
    }

    if ('kg' in value && prop === 'kg') {
      return value.kg
    } else if ('st' in value && prop === 'st') {
      return value.st
    } else if ('lbs' in value) {
      return value.lbs
    }

    return null
  }

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
    </div>
  )
}

export default TargetWeight
