import { useEffect, useRef, useState } from 'react'
import type { ApiError, Canceler } from '@/api/api.types'
import { Meal, searchMeals } from '@/api/mealApi'
import { toast } from 'react-toastify'

type AbortRef = {
  abort?: Canceler
}

const useFetchMeals = () => {
  const [meals, setMeals] = useState<Meal[]>([])
  const abortRef = useRef<AbortRef>({})

  const handleQuoteError = (error: ApiError) => {
    console.error(error)
    if (error.aborted) {
      toast.error('Request aborted!')
    } else {
      toast.error('Oops, error!')
    }
  }

  const fetchMeals = async (query: string) => {
    try {
      // Abort the previous request if there was one
      abortRef.current.abort?.()
      // Search for new meals
      const newMeals = await searchMeals(query, {
        // Assign the canceler method to the abortRef
        abort: (abort) => (abortRef.current.abort = abort),
      })
      setMeals(newMeals ?? [])
    } catch (error) {
      handleQuoteError(error)
    }
  }

  return {
    meals,
    fetchMeals,
  }
}

const SearchMealExample = () => {
  const [query, setQuery] = useState('')
  const { meals, fetchMeals } = useFetchMeals()

  useEffect(() => {
    fetchMeals(query)
  }, [query])

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <form className="mb-8">
        <fieldset className="flex flex-col">
          <label className="mb-4 font-semibold" htmlFor="meal">
            Search meal
          </label>
          <input
            className="px-4 py-2 border border-gray-300 rounded-lg"
            type="text"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            id="meal"
          />
        </fieldset>
      </form>

      <div>
        <h1 className="font-bold text-2xl mb-4">Meals</h1>

        <div className="max-h-60 overflow-y-auto">
          {meals.map((meal) => (
            <div className="py-1 odd:bg-gray-200" key={meal.idMeal}>
              <p>{meal.strMeal}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchMealExample
