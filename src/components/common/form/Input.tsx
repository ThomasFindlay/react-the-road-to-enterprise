import React from 'react'

type InputProps = {
  // id: string
  // value: string
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  labelProps?: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    const { id, value, onChange, label, labelProps, ...inputProps } = props
    return (
      <div className="flex flex-col items-start w-full space-y-2">
        {label ? (
          <label className="dsa" htmlFor="id" {...labelProps}>
            {label}
          </label>
        ) : null}
        <input
          className="shadow-sm outline-none block rounded-md border border-gray-300 w-full px-3 py-2  focus:ring-indigo-500 focus:border-indigo-500"
          ref={ref}
          id={id}
          value={value}
          onChange={onChange}
          {...inputProps}
        />
      </div>
    )
  }
)

export default Input
