import { useState } from 'react'
import DatePicker from './DatePicker'

type WrapperComponentsProps = {}

const WrapperComponents = (props: WrapperComponentsProps) => {
  const [date, setDate] = useState<Date>()
  return (
    <div className="flex justify-center">
      <DatePicker
        label="Date Of Birth"
        value={date?.toString()}
        onChange={(date) => date && setDate(date)}
      />
    </div>
  )
}

export default WrapperComponents
