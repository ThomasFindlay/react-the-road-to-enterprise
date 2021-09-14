import { useShoppingListContextSelector } from '@/context/ShoppingListContext'
import { memo } from 'react'

type ShoppingListHeaderProps = {}

const ShoppingListHeader = (props: ShoppingListHeaderProps) => {
  const shoppingListItemsLength = useShoppingListContextSelector(
    (ctx) => ctx[0].items.length
  )

  return (
    <div className="mb-6 flex justify-between">
      <h2 className="font-bold">Shopping List</h2>
      <span>{shoppingListItemsLength} items</span>
    </div>
  )
}

export default memo(ShoppingListHeader)
