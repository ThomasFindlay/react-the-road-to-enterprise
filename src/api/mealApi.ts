import { ApiRequestConfig } from './api.types'
import api from './api'

const URLS = {
  getMeal: 'search.php',
}

export type Meal = {
  idMeal: string
  strMeal: string
}

export type MealsResponse = {
  meals: Meal[]
}

export const searchMeals = (
  query: string,
  config: ApiRequestConfig
): Promise<Meal[]> => {
  return api
    .get<MealsResponse>(URLS.getMeal, {
      baseURL: 'https://www.themealdb.com/api/json/v1/1/',
      params: {
        s: query,
      },
      ...config,
    })
    .then((res) => res.data.meals)
}
