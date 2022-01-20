import { useState } from 'react'
import { nanoid } from 'nanoid'
import { Ingredient } from './ingredient.types'
import IngredientsList from './IngredientsList'
import AddIngredient from './AddIngredient'

const initialIngredients = [
  {
    id: nanoid(),
    name: 'Chicken',
  },
  {
    id: nanoid(),
    name: 'Beef',
  },
  {
    id: nanoid(),
    name: 'Carrot',
  },
]

type IngredientsProps = {}

const Ingredients = (props: IngredientsProps) => {
  console.log('Ingredient rendered')
  const [ingredient, setIngredient] = useState('')

  const [ingredients, setIngredients] =
    useState<Ingredient[]>(initialIngredients)

  const addIngredient = (ingredient: string) => {
    setIngredients((ingredients) => [
      ...ingredients,
      {
        name: ingredient,
        id: nanoid(),
      },
    ])
  }

  const deleteIngredient = (id: string) => {
    setIngredients((ingredients) => ingredients.filter((ing) => ing.id !== id))
  }

  return (
    <div className="mt-8">
      <h2 className="mb-4 font-semibold">Ingredients</h2>

      <div className="space-y-4 max-w-[20rem] mx-auto">
        <IngredientsList
          ingredients={ingredients}
          deleteIngredient={deleteIngredient}
        />

        <AddIngredient
          addIngredient={addIngredient}
          ingredient={ingredient}
          setIngredient={setIngredient}
        />
      </div>
    </div>
  )
}

export default Ingredients
