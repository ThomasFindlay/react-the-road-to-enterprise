import { useShoppingListContextSelector } from '@/context/ShoppingListContext'
import React from 'react'
import { DeleteItem, UpdateItem } from './ShoppingList.types'
import ShoppingListHeader from './ShoppingListHeader'
import ShoppingListRow from './ShoppingListRow'

const getUuid = () => '_' + Math.random().toString(36).substr(2, 9)

type ShoppingListProps = {}

const ShoppingList = (props: ShoppingListProps) => {
  const shoppingList = useShoppingListContextSelector((ctx) => ctx[0])
  const dispatch = useShoppingListContextSelector((ctx) => ctx[1])

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
        <ShoppingListHeader />
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
