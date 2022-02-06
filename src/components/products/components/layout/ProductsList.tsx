import clsx from 'clsx'
import styles from './productsLayout.module.css'

type ProductsListProps = {
  children: React.ReactNode
  className?: string
}

const ProductsList = (props: ProductsListProps) => {
  const { children, className, ...productsListProps } = props
  return (
    <div
      {...productsListProps}
      className={clsx(styles.productsListLayout, className)}
    >
      {props.children}
    </div>
  )
}

export default ProductsList
