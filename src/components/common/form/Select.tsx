import React from 'react'

type SelectProps = {
  label?: string
  labelProps?: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >
  options: Array<React.OptionHTMLAttributes<HTMLOptionElement>>
} & React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props: SelectProps, ref) => {
    const { id, value, onChange, options, label, labelProps, ...selectProps } =
      props
    return (
      <div className="flex flex-col items-start w-full space-y-2">
        {label ? (
          <label htmlFor="id" {...labelProps}>
            {label}
          </label>
        ) : null}
        <select
          className="shadow-sm outline-none block rounded-md border border-gray-300 w-full px-3 py-2  focus:ring-indigo-500 focus:border-indigo-500"
          ref={ref}
          id={id}
          value={value}
          onChange={onChange}
          {...selectProps}
        >
          {options.map(({ value, label, ...optionProps }, idx) => {
            return (
              <option value={value} key={`${value}-${idx}`} {...optionProps}>
                {label}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
)

export default Select
