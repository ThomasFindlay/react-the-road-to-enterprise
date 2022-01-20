import { useState } from 'react'
import { nanoid } from 'nanoid'
import { Ingredient } from './ingredient.types'
import IngredientsList from './IngredientsList'
import AddIngredient from './AddIngredient'
import IngredientsInfoHelper from './IngredientsInfoHelper'

const initialIngredients = [
  {
    id: nanoid(),
    name: '500g Chicken Breasts',
  },
  {
    id: nanoid(),
    name: '300 ml milk',
  },
  {
    id: nanoid(),
    name: '1 tbsp salt',
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
    <div className="mt-8 max-w-[20rem] mx-auto">
      <div className="flex justify-between">
        <h2 className="mb-4 font-semibold">Ingredients</h2>
        <IngredientsInfoHelper />
      </div>

      <div className="space-y-4">
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
