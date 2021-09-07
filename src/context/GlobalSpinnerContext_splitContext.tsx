import { useMemo } from 'react'
import GlobalSpinner from '@/components/GlobalSpinner'
import { contextFactory } from './helpers/contextFactory_splitContext'
import { useToggleState } from '@/hooks/useToggleState'

type GlobalSpinnerValues = {
  isSpinnerVisible: boolean
}

type GlobalSpinnerActions = {
  showSpinner: () => void
  hideSpinner: () => void
  toggleSpinner: () => void
}

const [useGlobalSpinnerContext, GlobalSpinnerContext] =
  contextFactory<GlobalSpinnerValues>()

const [useGlobalSpinnerActionsContext, GlobalSpinnerActionsContext] =
  contextFactory<GlobalSpinnerActions>()

export { useGlobalSpinnerContext, useGlobalSpinnerActionsContext }

type GlobalSpinnerContextProviderProps = {
  children: React.ReactNode
}

const GlobalSpinnerContextProvider = (
  props: GlobalSpinnerContextProviderProps
) => {
  const { children } = props
  const {
    state: isSpinnerVisible,
    open: showSpinner,
    close: hideSpinner,
    toggle: toggleSpinner,
  } = useToggleState(false)

  const values = useMemo(
    () => ({
      isSpinnerVisible,
    }),
    [isSpinnerVisible]
  )

  const actions = useMemo(
    () => ({
      showSpinner,
      hideSpinner,
      toggleSpinner,
    }),
    []
  )

  return (
    <GlobalSpinnerContext.Provider value={values}>
      <GlobalSpinnerActionsContext.Provider value={actions}>
        {children}
        <GlobalSpinner />
      </GlobalSpinnerActionsContext.Provider>
    </GlobalSpinnerContext.Provider>
  )
}

export default GlobalSpinnerContextProvider
