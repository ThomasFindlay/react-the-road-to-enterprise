import { useMemo, useCallback, useState } from 'react'
import { nanoid } from 'nanoid'
import { Ingredient } from './ingredient.types'
import IngredientsList from './IngredientsList'
import AddIngredient from './AddIngredient'

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

type IngredientsProps = {
  ingredientsInfoHelper: React.ReactNode
}

const Ingredients = (props: IngredientsProps) => {
  console.log('Ingredient rendered')
  const { ingredientsInfoHelper } = props
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

  const deleteIngredient = useCallback((id: string) => {
    setIngredients((ingredients) => ingredients.filter((ing) => ing.id !== id))
  }, [])

  const ingredientsHeaderText = useMemo(() => {
    console.log('createIngredientsHeaderText called')
    return (
      <h2 className="mb-4 font-semibold">Ingredients ({ingredients.length})</h2>
    )
  }, [ingredients.length])

  return (
    <div className="mt-8 max-w-[20rem] mx-auto">
      <div className="flex justify-between">
        {ingredientsHeaderText}
        {ingredientsInfoHelper}
      </div>

      <div className="space-y-4">
        <IngredientsList
          ingredients={ingredients}
          deleteIngredient={deleteIngredient}
        />

        <AddIngredient addIngredient={addIngredient} />
      </div>
    </div>
  )
}

export default Ingredients
