import api from './api'

export type Meal = {
  idMeal: string
  strMeal: string
  [key: string]: string
}

type FetchMealsResult = {
  meals: Meal[]
}

export const fetchMeals = (query: string) => {
  return api
    .get<FetchMealsResult>('search.php', {
      baseURL: 'https://www.themealdb.com/api/json/v1/1/',
      params: {
        s: query,
      },
    })
    .then((res) => res.data.meals)
}
