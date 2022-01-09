import { OnboardingFormData } from '@/components/onboarding/onboardingSchema'
import { FieldPath, useFormContext } from 'react-hook-form'
import BodyHeight from './components/BodyHeight'
import BodyWeight from './components/BodyWeight'

type BodyDetailsProps = {
  actions: (isValid: () => Promise<boolean>) => React.ReactNode
}

const BodyDetails = (props: BodyDetailsProps) => {
  const { actions } = props
  const { getValues, trigger } = useFormContext<OnboardingFormData>()

  const isValid = () => {
    const { height, weight } = getValues()
    let triggerValues: FieldPath<OnboardingFormData>[] = []

    if (height.unit === 'cm') {
      triggerValues.push('height.value.cm')
    } else {
      triggerValues.push('height.value.feet', 'height.value.inches')
    }

    if (weight.unit === 'kg') {
      triggerValues.push('weight.value.kg')
    } else {
      triggerValues.push('weight.value.st', 'weight.value.lbs')
    }

    return trigger(triggerValues)
  }

  return (
    <>
      <div className="space-y-8">
        <BodyHeight />
        <hr />
        <BodyWeight />
      </div>
      {actions(isValid)}
    </>
  )
}

export default BodyDetails
