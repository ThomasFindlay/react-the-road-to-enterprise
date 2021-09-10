import { ShoppingListItem } from './ShoppingList.types'

type ShoppingListHeaderProps = {
  shoppingList: ShoppingListItem[]
}

const ShoppingListHeader = (props: ShoppingListHeaderProps) => {
  return (
    <div className="mb-6 flex justify-between">
      <h2 className="font-bold">Shopping List</h2>
      <span>{props.shoppingList.length} items</span>
    </div>
  )
}

export default ShoppingListHeader
