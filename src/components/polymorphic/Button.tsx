import React from 'react'
import clsx from 'clsx'
import { PolymorphicComponentProps } from './polymorphic.types'

type ButtonProps<C extends React.ElementType> = PolymorphicComponentProps<
  C,
  {
    children: React.ReactNode
    className?: string
    variant?: 'primary' | 'link'
  }
>

const btnClasses = 'px-4 py-3 transition duration-300'

const VARIANTS = {
  primary: 'bg-blue-900 text-blue-100 hover:bg-blue-700',
  link: 'text-indigo-700 hover:text-indigo-800 hover:border-b border-indigo-800 !px-0 !pb-1',
}

const Button = <C extends React.ElementType = 'button'>(
  props: ButtonProps<C>
) => {
  const { children, as, className, variant, ...buttonProps } = props
  const Component = as || 'button'
  return (
    <Component
      className={clsx(className, btnClasses, variant && VARIANTS[variant])}
      {...buttonProps}
    >
      {children}
    </Component>
  )
}

export default Button
