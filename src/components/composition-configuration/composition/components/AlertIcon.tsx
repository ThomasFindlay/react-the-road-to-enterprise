import clsx from 'clsx'
import styles from '../../Alert.module.css'
import { SuccessIcon, InfoIcon, ErrorIcon } from '../../components/icons'
import { useVariant } from '../context/VariantContextProvider'

const ICONS = {
  success: SuccessIcon,
  info: InfoIcon,
  error: ErrorIcon,
}

type AlertIconProps = {}

const AlertIcon = (props: AlertIconProps) => {
  const variant = useVariant()
  const Icon = ICONS[variant]

  return (
    <div className={styles.alertIconBox}>
      <Icon className={clsx(styles.alertIcon, styles[variant])} />
    </div>
  )
}

export default AlertIcon
