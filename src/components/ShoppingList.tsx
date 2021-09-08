import React, { useReducer } from 'react'
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
  | ReducerAction<'ADD_ITEM' | 'UPDATE_ITEM' | 'DELETE_ITEM', ShoppingListItem>
  | ReducerAction<'UPDATE_NEW_SHOPPING_ITEM_NAME', string>

const reducer = (
  state: ShoppingListState,
  action: ShoppingListActions
): ShoppingListState => {
  switch (action.type) {
    case 'UPDATE_NEW_SHOPPING_ITEM_NAME':
      return {
        ...state,
        newShoppingItemName: action.payload,
      }
    case 'ADD_ITEM':
      return {
        ...state,
        newShoppingItemName: '',
        items: [...state.items, action.payload],
      }
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload
          }
          return item
        }),
      }
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      }
    default:
      return state
  }
}

type ShoppingListProps = {}

const ShoppingList = (props: ShoppingListProps) => {
  const [shoppingList, dispatch] = useReducer(reducer, shoppingItems)

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

  const deleteItem = (item: ShoppingListItem) => {
    dispatch({
      type: 'DELETE_ITEM',
      payload: item,
    })
  }

  const updateItem = (item: ShoppingListItem) => {
    dispatch({
      type: 'UPDATE_ITEM',
      payload: item,
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
      <h2 className="font-bold mb-6">Shopping List</h2>
      <div>
        <div className="space-y-3 mb-6 max-w-xs">
          {shoppingList.items.map((item) => {
            return (
              <ShoppingListRow
                key={item.id}
                item={item}
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
