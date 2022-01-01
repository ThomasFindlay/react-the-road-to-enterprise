import Input from '@/components/common/form/Input'
import Select from '@/components/common/form/Select'
import { useFormContext } from 'react-hook-form'

type PersonalDetailsProps = {}

const PersonalDetails = (props: PersonalDetailsProps) => {
  const { register } = useFormContext()
  return (
    <div className="space-y-4 text-left">
      <Input id="name" label="Name" {...register('name')} />
      <Input
        id="dob"
        label="Date of Birth"
        type="date"
        {...register('dateOfBirth')}
      />

      {/* <div className="flex flex-col items-start w-full space-y-2">
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          className="shadow-sm outline-none block rounded-md border border-gray-300 w-full px-3 py-2  focus:ring-indigo-500 focus:border-indigo-500"
          {...register('gender')}
        >
          <option value="">Choose option</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div> */}

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
      />
      <small className="text-gray-400">
        Sex that should be used for calculations.
      </small>
    </div>
  )
}

export default PersonalDetails
