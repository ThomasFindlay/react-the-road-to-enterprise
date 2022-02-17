import clsx from 'clsx'
import styles from '../../Alert.module.css'
import { useVariant } from '../context/VariantContextProvider'

type AlertBodyProps = {
  children: React.ReactNode
  className?: string
}

const AlertBody = (props: AlertBodyProps) => {
  const { className } = props
  const variant = useVariant()
  return (
    <div className={clsx(styles.alertBody, styles[variant], className)}>
      {props.children}
    </div>
  )
}

export default AlertBody
