import styles from './card.module.css'
interface Props {
  children: React.ReactNode
}

const Card = (props: Props) => {
  return <div className={styles.card}>{props.children}</div>
}

export default Card
