import clsx from 'clsx'
import styles from '../../Alert.module.css'
type AlertContentProps = {
  children: React.ReactNode
  className?: string
}

const AlertContent = (props: AlertContentProps) => {
  const { className, children } = props
  return <div className={clsx(styles.alertContent, className)}>{children}</div>
}

export default AlertContent
