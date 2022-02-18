import Input from '@/components/common/form/Input'
import { useFormContext } from 'react-hook-form'
import { Actions } from '../../Onboarding.types'
import { OnboardingFormData } from '../../onboardingSchema'
import { getErrorProps } from '@/helpers/getErrorProps'

type AccountInformationProps = {
  actions: Actions
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
        <Input
          id="email"
          label="Email"
          {...register('email')}
          {...getErrorProps(errors.email)}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          {...register('password')}
          {...getErrorProps(errors.password)}
        />
      </div>
      {actions(isValid)}
    </>
  )
}

export default AccountInformation
