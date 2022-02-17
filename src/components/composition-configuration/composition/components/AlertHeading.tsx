import clsx from 'clsx'
import styles from '../../Alert.module.css'
import { useVariant } from '../context/VariantContextProvider'

type AlertHeadingProps = {
  children: React.ReactNode
  className?: string
}

const AlertHeading = (props: AlertHeadingProps) => {
  const { children, className } = props
  const variant = useVariant()
  return (
    <div className={clsx(className, styles.alertHeader, styles[variant])}>
      {children}
    </div>
  )
}

export default AlertHeading
