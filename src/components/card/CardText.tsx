import styles from './card.module.css'

interface Props {
  children: React.ReactNode
}

const CardText = (props: Props) => {
  return <div className={styles.cardText}>{props.children}</div>
}

export default CardText
