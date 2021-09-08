import { useEffect, useState } from 'react'
import { ShoppingListItem } from './ShoppingList'

type ShoppingListRowProps = {
  item: ShoppingListItem
  deleteItem: (item: ShoppingListItem) => void
  updateItem: (item: ShoppingListItem) => void
}

const useEditShoppingItem = (
  props: Pick<ShoppingListRowProps, 'item' | 'updateItem'>
) => {
  const { item, updateItem } = props
  const [name, setName] = useState(item.name)
  const [isEditing, setIsEditing] = useState(false)
  useEffect(() => {
    setName(props.item.name)
  }, [props.item])

  const onSaveItem = () => {
    updateItem({
      ...item,
      name,
    })
    setIsEditing(false)
  }

  const onEditItem = () => {
    setIsEditing(true)
  }

  return {
    name,
    isEditing,
    setName,
    onSaveItem,
    onEditItem,
  }
}

const ShoppingListRow = (props: ShoppingListRowProps) => {
  const { item, deleteItem } = props
  const { name, isEditing, setName, onSaveItem, onEditItem } =
    useEditShoppingItem(props)

  return (
    <div className="flex justify-between items-center">
      <div>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        ) : (
          <div>{item.name}</div>
        )}
      </div>
      <div className="space-x-3">
        {isEditing ? (
          <button className="hover:underline" onClick={onSaveItem}>
            Save
          </button>
        ) : (
          <button className="hover:underline" onClick={onEditItem}>
            Edit
          </button>
        )}

        <button className="hover:underline" onClick={() => deleteItem(item)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default ShoppingListRow
