export type ShoppingListItem = {
  id: string
  name: string
}

export type ShoppingListState = {
  newShoppingItemName: string
  items: ShoppingListItem[]
}

export type UpdateItem = (payload: {
  index: number
  item: ShoppingListItem
}) => void

export type DeleteItem = (payload: { index: number }) => void

export type ReducerAction<T, P> = {
  type: T
  payload: P
}

export type ShoppingListActions =
  | ReducerAction<'ADD_ITEM', ShoppingListItem>
  | ReducerAction<
      'UPDATE_ITEM',
      {
        index: number
        item: ShoppingListItem
      }
    >
  | ReducerAction<'DELETE_ITEM', { index: number }>
  | ReducerAction<'UPDATE_NEW_SHOPPING_ITEM_NAME', string>
