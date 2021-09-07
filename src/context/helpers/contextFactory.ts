import {
  createContext,
  useContext,
  useContextSelector,
} from 'use-context-selector'

export const contextFactory = <CtxState>() => {
  const context = createContext<CtxState | undefined>(undefined)

  const useCtx = () => {
    const ctx = useContext(context)
    if (ctx === undefined)
      throw new Error(
        'useContextSelector must be used within a context provider'
      )

    return ctx
  }

  type ContextSelector<Selected, CtxState> = (ctxState: CtxState) => Selected

  const useCtxSelector = <Selected>(
    contextSelector: ContextSelector<Selected, CtxState>
  ) => {
    const selector = (state: CtxState | undefined) => {
      if (state === undefined)
        throw new Error('useContext must be used within a context provider')

      return contextSelector(state)
    }

    return useContextSelector<
      CtxState | undefined,
      ReturnType<typeof selector>
    >(context, selector)
  }

  return [context, useCtx, useCtxSelector] as const
}
