import { createContext, useContextSelector } from 'use-context-selector'

type ContextSelector<A, T> = (value: A | undefined) => T

export const contextFactory = <A>() => {
  const context = createContext<A | undefined>(undefined)

  function selectWholeContext<T>(state: A | undefined) {
    return state as unknown as T
  }

  const useCtx = <T>(contextSelector?: ContextSelector<A, T>) => {
    const selectorFn = contextSelector || selectWholeContext
    const selector: ContextSelector<A, T> = (state: A | undefined) => {
      if (state === undefined) return state
      return selectorFn(state)
    }
    return useContextSelector<A | undefined, T>(context, selector)
  }

  return [useCtx, context] as const
}
