import styles from './card.module.css'

interface Props {
  children: React.ReactNode
}

const CardContent = (props: Props) => {
  return <div className={styles.cardContent}>{props.children}</div>
}

export default CardContent
