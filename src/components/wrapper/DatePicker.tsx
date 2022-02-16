import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
type DatePickerProps = {
  label?: string
} & ReactDatePickerProps

const DatePicker = (props: DatePickerProps) => {
  const { label, ...datePickerProps } = props
  return (
    <div className="flex flex-col items-start space-y-2">
      {label ? <label>{label}</label> : null}
      <div>
        <ReactDatePicker {...datePickerProps} />
      </div>
    </div>
  )
}

export default DatePicker
