import styles from './card.module.css'
interface Props {
  children: React.ReactNode
}

const CardActions = (props: Props) => {
  return <div className={styles.cardActions}>{props.children}</div>
}

export default CardActions
