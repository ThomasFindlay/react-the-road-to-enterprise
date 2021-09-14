import {
  ShoppingListActions,
  ShoppingListState,
} from '@/components/ShoppingList.types'
import React from 'react'
import { useImmerReducer } from 'use-immer'
import { contextFactory } from './helpers/contextFactory'

const [
  ShoppingListContext,
  useShoppingListContext,
  useShoppingListContextSelector,
] = contextFactory<[ShoppingListState, React.Dispatch<ShoppingListActions>]>()

export { useShoppingListContext, useShoppingListContextSelector }

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

type ShoppingListContextProviderProps = {
  children: React.ReactNode
}

const ShoppingListContextProvider = (
  props: ShoppingListContextProviderProps
) => {
  const [shoppingList, dispatch] = useImmerReducer(reducer, shoppingItems)

  return (
    <ShoppingListContext.Provider value={[shoppingList, dispatch]}>
      {props.children}
    </ShoppingListContext.Provider>
  )
}

export default ShoppingListContextProvider
