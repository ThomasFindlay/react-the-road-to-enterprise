import Input from '@/components/common/form/Input'
import { useFormContext } from 'react-hook-form'

type AccountInformationProps = {}

const AccountInformation = (props: AccountInformationProps) => {
  const { register } = useFormContext()
  return (
    <div className="space-y-4">
      <Input id="email" label="Email" {...register('email')} />
      <Input id="password" label="Password" {...register('password')} />
    </div>
  )
}

export default AccountInformation
