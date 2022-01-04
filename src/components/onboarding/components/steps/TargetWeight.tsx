import Input from '@/components/common/form/Input'
import { useEffect } from 'react'
import { FieldError, useFormContext, UseFormSetError } from 'react-hook-form'
import { OnboardingFormData } from '../../Onboarding'

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
    getValues,
  } = useFormContext<OnboardingFormData>()
  const values = getValues()
  const weightUnit = watch('weight.unit')
  const weightGoal = watch('weightGoal')
  const weightValue = watch('weight.value')
  const targetWeightValue = watch('targetWeight.value')
  console.log('weight value', weightGoal, weightValue, targetWeightValue)

  useEffect(() => {
    if (
      weightUnit === 'kg' &&
      typeof weightValue === 'object' &&
      'kg' in weightValue
    ) {
      let error = handleCompareKg(
        weightGoal,
        weightValue.kg,
        (targetWeightValue as { kg: number }).kg
      )
      error &&
        setError('targetWeight.value.kg', {
          message: error,
        })
    } else {
      // handleCompareStLbs(weightValue, targetWeightValue)
    }
  }, [])

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
  /**
   * TODO:
   * Make this more reusable. Accept extractErrorField as a param and make it a factory that returns getErrorProps method
   * You can call it errorPropsHelper
   */
  const getErrorProps = <T extends object | undefined>(
    value: T,
    prop: 'kg' | 'st' | 'lbs'
  ) => {
    const errorField = extractErrorField(value, prop)

    if (errorField) {
      return {
        error: true,
        errorMessage: errorField.message,
      }
    } else {
      return {
        error: false,
        errorMessage: '',
      }
    }
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
          {...getErrorProps(errors.targetWeight, 'kg')}
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
            {...getErrorProps(errors.targetWeight, 'st')}
          />
          <Input
            id="weight-inches"
            label="Pounds"
            type="number"
            {...register('targetWeight.value.lbs', {
              valueAsNumber: true,
            })}
            {...getErrorProps(errors.targetWeight, 'lbs')}
          />
        </div>
      )}
    </div>
  )
}

export default TargetWeight
