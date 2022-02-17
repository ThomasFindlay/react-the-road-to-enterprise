import clsx from 'clsx'
import React from 'react'
import styles from '../Alert.module.css'
import { SuccessIcon, InfoIcon, ErrorIcon } from '../components/icons'
import VariantContextProvider from './context/VariantContextProvider'
import { AlertVariant } from '../alert.types'

type AlertProps = {
  show: boolean
  variant: AlertVariant
  showIcon?: boolean
  headerText?: string
  text?: string
  children?: React.ReactNode
  onClose?: () => void
}

const ICONS = {
  success: SuccessIcon,
  info: InfoIcon,
  error: ErrorIcon,
}

const Alert = (props: AlertProps) => {
  const { children, text, headerText, show, variant, showIcon = false } = props

  const Icon = ICONS[variant]

  return show ? (
    <VariantContextProvider variant={variant}>
      <div className={clsx(styles.alert, styles[variant])}>
        {/* Side icon */}
        {props.children}
        {/* {showIcon ? (
          <div className={styles.alertIconBox}>
            <Icon className={clsx(styles.alertIcon, styles[variant])} />
          </div>
        ) : null} */}
        {/* {onClose ? (
        <button className="absolute top-5 right-5" onClick={onClose}>
          <CloseIcon className={clsx(styles.alertIcon, styles[variant])} />
        </button>
      ) : null} */}
        <div>
          {/* Alert header */}
          {/* {headerText ? (
            <div className={clsx(styles.alertHeader, styles[variant])}>
              {headerText}
            </div>
          ) : null} */}
          {/* Alert body */}
          <div className={clsx(styles.alertBody)}>{text ? text : children}</div>
        </div>
      </div>
    </VariantContextProvider>
  ) : null
}

export default Alert
