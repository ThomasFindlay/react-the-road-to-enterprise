import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'

type DatePickerProps = {
  label?: string
} & ReactDatePickerProps

const DatePicker = (props: DatePickerProps) => {
  const { label, ...datePickerProps } = props
  return (
    <div className="flex flex-col space-y-2">
      {label ? <label>{label}</label> : null}
      <ReactDatePicker {...datePickerProps} />
    </div>
  )
}

export default DatePicker
