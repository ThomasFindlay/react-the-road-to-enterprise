import { useGlobalSpinnerContextSelector } from '@/context/GlobalSpinnerContext'

type GlobalSpinnerExampleProps = {}

const GlobalSpinnerExample = (props: GlobalSpinnerExampleProps) => {
  const showSpinner = useGlobalSpinnerContextSelector((ctx) => ctx.showSpinner)
  const hideSpinner = useGlobalSpinnerContextSelector((ctx) => ctx.hideSpinner)

  const onShowSpinner = () => {
    showSpinner()
    setTimeout(hideSpinner, 2000)
  }

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
}

export default GlobalSpinnerExample
