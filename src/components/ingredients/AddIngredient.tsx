import { useState } from 'react'

type AddIngredientProps = {
  addIngredient: (ingredient: string) => void
}

const AddIngredient = (props: AddIngredientProps) => {
  console.log('AddIngredient rendered')
  const { addIngredient } = props
  const [ingredient, setIngredient] = useState('')

  return (
    <form className="">
      <fieldset className="flex flex-col items-start space-y-3 mb-4">
        <label>Add ingredient</label>
        <input
          className="w-full"
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
      </fieldset>
      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-blue-100 px-3 py-2 min-w-[5rem]"
          onClick={(e) => {
            e.preventDefault()
            if (!ingredient) return
            addIngredient(ingredient)
            setIngredient('')
          }}
        >
          Add
        </button>
      </div>
    </form>
  )
}

export default AddIngredient
