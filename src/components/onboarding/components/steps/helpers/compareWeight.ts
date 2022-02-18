import { OnboardingFormData } from '@/components/onboarding/onboardingSchema'

const stonesToPounds = (stones: number) => stones * 14

const WEIGHT_MESSAGES = {
  gain: "Didn't you say you want to gain weight?",
  lose: "Didn't you say you want to lose weight?",
  maintain: "Didn't you say you want to maintain weight?",
}

type HandleCompareKg = (options: {
  weightGoal: OnboardingFormData['weightGoal']
  weightKg: number
  targetWeightKg: number
}) => string

export const handleCompareKg: HandleCompareKg = (options) => {
  const { weightGoal, weightKg, targetWeightKg } = options
  if (weightGoal === 'gain-weight' && targetWeightKg < weightKg) {
    return WEIGHT_MESSAGES.gain
  } else if (weightGoal === 'lose-weight' && targetWeightKg > weightKg) {
    return WEIGHT_MESSAGES.lose
  } else if (
    weightGoal === 'maintain-weight' &&
    (targetWeightKg > weightKg + 10 || targetWeightKg < weightKg - 10)
  ) {
    return WEIGHT_MESSAGES.maintain
  }

  return ''
}

type HandleCompareStLbs = (options: {
  weightGoal: OnboardingFormData['weightGoal']
  weightSt: number
  weightLbs: number
  targetWeightSt: number
  targetWeightLbs: number
}) => string

export const handleCompareStLbs: HandleCompareStLbs = (options) => {
  const { weightGoal, weightSt, weightLbs, targetWeightSt, targetWeightLbs } =
    options
  const weight = stonesToPounds(weightSt) + weightLbs
  const targetWeight = stonesToPounds(targetWeightSt) + targetWeightLbs

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
