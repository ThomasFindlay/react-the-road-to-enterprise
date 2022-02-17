import clsx from 'clsx'
import CloseIcon from '../../components/icons/CloseIcon'
import styles from '../../Alert.module.css'
import { useVariant } from '../context/VariantContextProvider'

type AlertCloseButtonProps = {
  onClose: () => void
  className?: string
}

const AlertCloseButton = (props: AlertCloseButtonProps) => {
  const { onClose, className } = props
  const variant = useVariant()
  return (
    <div>
      <button className="absolute top-5 right-5" onClick={onClose}>
        <CloseIcon
          className={clsx(styles.alertIcon, styles[variant], className)}
        />
      </button>
    </div>
  )
}

export default AlertCloseButton
