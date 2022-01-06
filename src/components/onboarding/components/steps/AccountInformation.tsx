import Input from '@/components/common/form/Input'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { OnboardingFormData } from '../../onboardingSchema'
import { OnboardingActionsProps } from '../OnboardingStepperActions'

type AccountInformationProps = {
  actions: (isValid: () => Promise<boolean>) => React.ReactNode
}

const AccountInformation = (props: AccountInformationProps) => {
  const { actions } = props
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext<OnboardingFormData>()

  const isValid = () => trigger(['email', 'password'])

  return (
    <>
      <div className="space-y-4">
        <Input id="email" label="Email" {...register('email')} />
        <Input id="password" label="Password" {...register('password')} />
      </div>
      {actions(isValid)}
    </>
  )
}

export default AccountInformation
