import clsx from 'clsx'
import React from 'react'

type RadioGroupRootProps = {
  children: React.ReactNode
  className?: string
  error?: boolean
  errorMessage?: string
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const RadioGroupRoot = (props: RadioGroupRootProps) => {
  const { className, error, errorMessage, children, ...radioProps } = props
  return (
    <div className="text-left space-y-2">
      <div
        role="radiogroup"
        className={clsx(error && 'border border-red-400 bg-red-100', className)}
        tabIndex={-1}
        {...radioProps}
      >
        {children}
      </div>
      <div>
        {error ? <span className="text-red-500 ">{errorMessage}</span> : null}
      </div>
    </div>
  )
}

type RadioGroupItemProps = {
  index?: number
  label: string
  labelProps?: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const RadioGroupItem = React.forwardRef<
  HTMLInputElement,
  RadioGroupItemProps
>((props: RadioGroupItemProps, ref) => {
  const { id, value, label, index, onChange, ...radioItemProps } = props
  return (
    <label
      key={id}
      htmlFor={id}
      className="first:border-t border-b border-l border-r border-gray-200 w-full px-4 py-3 flex items-center cursor-pointer"
    >
      <input
        id={id}
        ref={ref}
        className="mr-4 peer"
        type="radio"
        value={value}
        onChange={onChange}
        {...radioItemProps}
      />
      {label}
    </label>
  )
})

const RadioGroup = {
  Root: RadioGroupRoot,
  Item: RadioGroupItem,
}

export default RadioGroup
