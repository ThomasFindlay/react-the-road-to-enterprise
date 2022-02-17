import clsx from 'clsx'
import styles from '../../Alert.module.css'
import { useVariant } from '../context/VariantContextProvider'

type AlertBodyProps = {
  children: React.ReactNode
}

const AlertBody = (props: AlertBodyProps) => {
  const variant = useVariant()
  return (
    <div className={clsx(styles.alertBody, styles[variant])}>
      {props.children}
    </div>
  )
}

export default AlertBody
