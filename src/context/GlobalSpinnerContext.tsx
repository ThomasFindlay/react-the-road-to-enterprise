import GlobalSpinner from '@/components/GlobalSpinner'
import { contextFactory } from './helpers/contextFactory'
import { useToggleState } from '@/hooks/useToggleState'
type GlobalSpinnerValues = {
  isSpinnerVisible: boolean
  showSpinner: () => void
  hideSpinner: () => void
  toggleSpinner: () => void
}

const [
  GlobalSpinnerContext,
  useGlobalSpinnerContext,
  useGlobalSpinnerContextSelector,
] = contextFactory<GlobalSpinnerValues>()

export { useGlobalSpinnerContext, useGlobalSpinnerContextSelector }

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

  return (
    <GlobalSpinnerContext.Provider
      value={{
        isSpinnerVisible,
        showSpinner,
        hideSpinner,
        toggleSpinner,
      }}
    >
      {children}
      <GlobalSpinner />
    </GlobalSpinnerContext.Provider>
  )
}

export default GlobalSpinnerContextProvider
