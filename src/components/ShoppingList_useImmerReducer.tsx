import React from 'react'
import { useImmerReducer } from 'use-immer'
import ShoppingListHeader from './ShoppingListHeader_Initial'
import ShoppingListRow from './ShoppingListRow'

const getUuid = () => '_' + Math.random().toString(36).substr(2, 9)

export type ShoppingListItem = {
  id: string
  name: string
}

type ShoppingListState = {
  newShoppingItemName: string
  items: ShoppingListItem[]
}

export type UpdateItem = (payload: {
  index: number
  item: ShoppingListItem
}) => void

export type DeleteItem = (payload: { index: number }) => void

const shoppingItems: ShoppingListState = {
  newShoppingItemName: '',
  items: [
    {
      id: '1',
      name: 'Sea Salt',
    },
    {
      id: '2',
      name: 'Apples',
    },
    {
      id: '3',
      name: 'Chicken breasts',
    },
  ],
}

type ReducerAction<T, P> = {
  type: T
  payload: P
}

type ShoppingListActions =
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

const reducer = (
  state: ShoppingListState,
  action: ShoppingListActions
): ShoppingListState => {
  switch (action.type) {
    case 'UPDATE_NEW_SHOPPING_ITEM_NAME':
      state.newShoppingItemName = action.payload
      break
    case 'ADD_ITEM':
      state.newShoppingItemName = ''
      state.items.push(action.payload)
      break
    case 'UPDATE_ITEM':
      state.items.splice(action.payload.index, 1, action.payload.item)
      break
    case 'DELETE_ITEM':
      state.items.splice(action.payload.index, 1)
      break
  }
  return state
}

type ShoppingListProps = {}

const ShoppingList = (props: ShoppingListProps) => {
  const [shoppingList, dispatch] = useImmerReducer(reducer, shoppingItems)

  const addItem = () => {
    if (!shoppingList.newShoppingItemName) return
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: getUuid(),
        name: shoppingList.newShoppingItemName,
      },
    })
  }

  const deleteItem: DeleteItem = (item) => {
    dispatch({
      type: 'DELETE_ITEM',
      payload: item,
    })
  }

  const updateItem: UpdateItem = (payload) => {
    dispatch({
      type: 'UPDATE_ITEM',
      payload,
    })
  }

  const onChangeShoppingListItemName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: 'UPDATE_NEW_SHOPPING_ITEM_NAME',
      payload: e.target.value,
    })
  }

  return (
    <div className="py-8 max-w-4xl mx-auto text-left">
      <div className="max-w-xs">
        <ShoppingListHeader shoppingList={shoppingList.items} />
        <div className="space-y-3 mb-6">
          {shoppingList.items.map((item, index) => {
            return (
              <ShoppingListRow
                key={item.id}
                item={item}
                index={index}
                updateItem={updateItem}
                deleteItem={deleteItem}
              />
            )
          })}
        </div>
        <div className="flex flex-col justify-end space-y-2 max-w-xs">
          <label htmlFor="shppingItemField">Add item</label>
          <input
            type="text"
            id="shoppingItemField"
            value={shoppingList.newShoppingItemName}
            onChange={onChangeShoppingListItemName}
          />
          <button
            className="self-end px-4 py-2 bg-green-200 text-green-900"
            onClick={addItem}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShoppingList
