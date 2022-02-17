import React from 'react'
import { AlertVariant } from './alert.types'
import {
  Alert,
  AlertIcon,
  AlertCloseButton,
  AlertHeading,
  AlertBody,
} from './composition/Alert'

type AlertProps = {
  show: boolean
  variant: AlertVariant
  showIcon?: boolean
  headerText?: string
  text?: string
  children?: React.ReactNode
  onClose?: () => void
}

const CombinedAlert = (props: AlertProps) => {
  const {
    children,
    text,
    headerText,
    show,
    variant,
    onClose,
    showIcon = true,
  } = props

  return show ? (
    <Alert show={show} variant={variant}>
      {/* Side icon */}
      {showIcon ? <AlertIcon /> : null}
      {/* Close alert button */}
      {onClose ? <AlertCloseButton onClose={onClose} /> : null}
      <div className="py-4">
        {/* CombinedAlert header */}
        {headerText ? <AlertHeading>{headerText}</AlertHeading> : null}
        {/* CombinedAlert body */}
        <AlertBody>{text ? text : children}</AlertBody>
      </div>
    </Alert>
  ) : null
}

export default CombinedAlert
