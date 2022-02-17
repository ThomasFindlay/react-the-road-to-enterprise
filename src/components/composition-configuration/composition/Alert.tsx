import clsx from 'clsx'
import React from 'react'
import styles from '../Alert.module.css'
import VariantContextProvider from './context/VariantContextProvider'
import { AlertVariant } from '../alert.types'
export * from './components'

type AlertProps = {
  show: boolean
  variant: AlertVariant
  showIcon?: boolean
  headerText?: string
  text?: string
  children?: React.ReactNode
  onClose?: () => void
}

export const Alert = (props: AlertProps) => {
  const { show, variant } = props

  return show ? (
    <VariantContextProvider variant={variant}>
      <div className={clsx(styles.alert, styles[variant])}>
        {props.children}
      </div>
    </VariantContextProvider>
  ) : null
}

export default Alert
