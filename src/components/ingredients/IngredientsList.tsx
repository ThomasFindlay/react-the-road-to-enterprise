import { memo } from 'react'
import { Ingredient } from './ingredient.types'

type IngredientsListProps = {
  ingredients: Ingredient[]
  deleteIngredient: (id: string) => void
}

const IngredientsList = (props: IngredientsListProps) => {
  console.log('IngredientsList rendered')
  const { ingredients, deleteIngredient } = props
  return (
    <div className="text-left">
      <ul className="divide-y divide-gray-300">
        {ingredients.map((ingredient) => {
          return (
            <li
              key={ingredient.id}
              className="py-3 flex justify-between items-center"
            >
              <span>{ingredient.name}</span>
              <button onClick={() => deleteIngredient(ingredient.id)}>X</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default memo(IngredientsList)
