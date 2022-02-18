import Input from '@/components/common/form/Input'
import Select from '@/components/common/form/Select'
import { getErrorProps } from '@/helpers'
import { useFormContext } from 'react-hook-form'
import { Actions } from '../../Onboarding.types'
import { OnboardingFormData } from '../../onboardingSchema'

type PersonalDetailsProps = {
  actions: Actions
}

const PersonalDetails = (props: PersonalDetailsProps) => {
  const { actions } = props
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<OnboardingFormData>()
  const isValid = () => trigger(['name', 'dateOfBirth', 'gender'])
  return (
    <>
      <div className="space-y-4 text-left">
        <Input
          id="name"
          label="Name"
          {...register('name')}
          {...getErrorProps(errors.name)}
        />
        <Input
          id="dob"
          label="Date of Birth"
          type="date"
          {...register('dateOfBirth')}
          {...getErrorProps(errors.dateOfBirth)}
        />

        <Select
          id="gender"
          label="Gender"
          {...register('gender')}
          options={[
            {
              value: '',
              label: 'Choose option',
            },
            {
              value: 'male',
              label: 'Male',
            },
            {
              value: 'female',
              label: 'Female',
            },
          ]}
          {...getErrorProps(errors.gender)}
        />
        <small className="text-gray-400">
          Sex that should be used for calculations.
        </small>
      </div>
      {actions(isValid)}
    </>
  )
}

export default PersonalDetails
