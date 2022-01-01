import React from 'react'

type RadioGroupRootProps = {
  children: React.ReactNode
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const RadioGroupRoot = (props: RadioGroupRootProps) => {
  return (
    <div role="radiogroup" tabIndex={-1} {...props}>
      {props.children}
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
