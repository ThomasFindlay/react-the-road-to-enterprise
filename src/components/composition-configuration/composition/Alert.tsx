import clsx from 'clsx'
import React from 'react'
import styles from '../Alert.module.css'
import VariantContextProvider from './context/VariantContextProvider'
import { AlertVariant } from '../alert.types'
export * from './components'

type AlertProps = {
  show: boolean
  variant: AlertVariant
  children?: React.ReactNode
}

export const Alert = (props: AlertProps) => {
  const { show, variant, children } = props

  return show ? (
    <VariantContextProvider variant={variant}>
      <div className={clsx(styles.alert, styles[variant])}>{children}</div>
    </VariantContextProvider>
  ) : null
}

export default Alert
