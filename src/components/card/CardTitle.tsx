import styles from './card.module.css'

interface Props {
  children: React.ReactNode
}

const CardTitle = (props: Props) => {
  return <div className={styles.cardTitle}>{props.children}</div>
}

export default CardTitle
