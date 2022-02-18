import Input from '@/components/common/form/Input'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { getErrorProps } from '@/helpers/getErrorProps'
import { OnboardingFormData } from '../../onboardingSchema'
import { Actions } from '../../Onboarding.types'
import { get } from 'lodash-es'

const WEIGHT_MESSAGES = {
  gain: "Didn't you say you want to gain weight?",
  lose: "Didn't you say you want to lose weight?",
  maintain: "Didn't you say you want to maintain weight?",
}

type TargetWeightProps = {
  actions: Actions
}

type GetErrorPropsParams = Parameters<typeof getErrorProps>

const getCombinedErrorProps = (
  obj: GetErrorPropsParams[0],
  path: GetErrorPropsParams[1],
  localError?: string
) => {
  if (localError) {
    return {
      error: true,
      errorMessage: localError,
    }
  }
  return getErrorProps(obj, path)
}

const TargetWeight = (props: TargetWeightProps) => {
  const { actions } = props
  const {
    register,
    watch,
    formState: { errors, ...formState },
    setError,
    clearErrors,
    getValues,
    trigger,
  } = useFormContext<OnboardingFormData>()
  console.log('form state', formState)
  const values = getValues()
  const weightUnit = watch('weight.unit')
  const weightGoal = watch('weightGoal')
  const weightValue = watch('weight.value')
  const targetWeightValue = watch('targetWeight.value')
  console.log('check', targetWeightValue, errors)
  // Use useMemo to derive custom errors
  const [localError, setLocalError] = useState('')
  const stonesToPounds = (stones: number) => stones * 14
  const handleCompareKg = (
    weightGoal: OnboardingFormData['weightGoal'],
    weightValue: number,
    targetWeightValue: number
  ) => {
    if (weightGoal === 'gain-weight' && targetWeightValue < weightValue) {
      return WEIGHT_MESSAGES.gain
    } else if (
      weightGoal === 'lose-weight' &&
      targetWeightValue > weightValue
    ) {
      return WEIGHT_MESSAGES.lose
    } else if (
      weightGoal === 'maintain-weight' &&
      (targetWeightValue > weightValue + 10 ||
        targetWeightValue < weightValue - 10)
    ) {
      return WEIGHT_MESSAGES.maintain
    }

    return ''
  }

  const handleCompareStLbs = (
    weightGoal: OnboardingFormData['weightGoal'],
    weightValue: {
      st: number
      lbs: number
    },
    targetWeightValue: {
      st: number
      lbs: number
    }
  ) => {
    const weight = stonesToPounds(weightValue.st) + weightValue.lbs
    const targetWeight =
      stonesToPounds(targetWeightValue.st) + targetWeightValue.lbs

    if (weightGoal === 'gain-weight' && targetWeight < weight) {
      return WEIGHT_MESSAGES.gain
    } else if (weightGoal === 'lose-weight' && targetWeight > weight) {
      return WEIGHT_MESSAGES.lose
    } else if (
      weightGoal === 'maintain-weight' &&
      (targetWeight > weight + 20 || targetWeight < weight - 20)
    ) {
      return WEIGHT_MESSAGES.maintain
    }

    return ''
  }

  useEffect(() => {
    let error = ''
    if (
      weightUnit === 'kg' &&
      typeof weightValue === 'object' &&
      'kg' in weightValue &&
      'kg' in targetWeightValue
    ) {
      error = handleCompareKg(weightGoal, weightValue.kg, targetWeightValue.kg)
      console.log('compare kg', { error, weightValue, weightUnit })
    } else if (
      weightUnit === 'st/lbs' &&
      typeof weightValue === 'object' &&
      'st' in weightValue &&
      'st' in targetWeightValue
    ) {
      error = handleCompareStLbs(weightGoal, weightValue, targetWeightValue)
    }

    setLocalError(error)
  }, [
    get(targetWeightValue, 'kg'),
    get(targetWeightValue, 'st'),
    get(targetWeightValue, 'lbs'),
  ])

  const isValid = () => trigger(['targetWeight'])
  console.log('errors', errors)
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
        {!errors.targetWeight && localError ? (
          <div className="text-left -translate-y-2">
            <span className="text-red-500 ">{localError}</span>
          </div>
        ) : null}
      </div>
      {actions(isValid)}
    </>
  )
}

export default TargetWeight
