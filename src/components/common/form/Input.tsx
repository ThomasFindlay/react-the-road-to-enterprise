import React from 'react'

type InputProps = {
  label?: string
  labelProps?: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >
  error?: boolean
  errorMessage?: string
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    const { id, label, labelProps, error, errorMessage, ...inputProps } = props

    console.log('in input', error, errorMessage)
    return (
      <div className="flex flex-col items-start w-full space-y-2">
        {label ? (
          <label htmlFor={id} {...labelProps}>
            {label}
          </label>
        ) : null}
        <input
          className="shadow-sm outline-none block rounded-md border border-gray-300 w-full px-3 py-2  focus:ring-indigo-500 focus:border-indigo-500"
          ref={ref}
          id={id}
          {...inputProps}
        />
      </div>
    )
  }
)

export default Input
