import styles from '../../Alert.module.css'

type AlertBodyProps = {
  children: React.ReactNode
}

const AlertBody = (props: AlertBodyProps) => {
  return <div className={styles.alertBody}>{props.children}</div>
}

export default AlertBody
