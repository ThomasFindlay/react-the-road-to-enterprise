import {
  GlobalSpinnerContext,
  GlobalSpinnerContextValue,
} from '@/context/GlobalSpinnerContext_Initial'
import { useContext, useMemo } from 'react'

type GlobalSpinnerExampleProps = {}

const GlobalSpinnerExample = (props: GlobalSpinnerExampleProps) => {
  const { showSpinner, hideSpinner } = useContext(
    GlobalSpinnerContext
  ) as GlobalSpinnerContextValue

  const onShowSpinner = () => {
    showSpinner()
    setTimeout(hideSpinner, 2000)
  }

  return useMemo(() => {
    console.log('GlobalSpinnerExample rendered')

    return (
      <div className="py-8 max-w-2xl mx-auto space-y-4">
        <button
          className="bg-blue-600 text-blue-100 px-4 py-3"
          onClick={onShowSpinner}
        >
          Show global spinner
        </button>
      </div>
    )
  }, [])
}

export default GlobalSpinnerExample
