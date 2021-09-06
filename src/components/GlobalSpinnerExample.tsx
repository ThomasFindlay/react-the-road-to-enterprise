import { useGlobalSpinnerActionsContext } from '@/context/GlobalSpinnerContext'

type GlobalSpinnerExampleProps = {}

const GlobalSpinnerExample = (props: GlobalSpinnerExampleProps) => {
  const { showSpinner, hideSpinner } = useGlobalSpinnerActionsContext()

  const onShowSpinner = () => {
    showSpinner()
    setTimeout(hideSpinner, 2000)
  }

  console.log('GlobalSpinnerExample rendered')

  return (
    <div className="py-8 max-w-2xl mx-auto space-y-4">
      <div className="leading-loose">
        The{' '}
        <code className="bg-gray-200 p-1">{'<GlobalSpinnerProvider />'}</code>{' '}
        component is used in the App.tsx component. Thanks to that, the{' '}
        <code className="bg-gray-200 p-1">useGlobalSpinnerActionsContext</code>{' '}
        method can be imported and used anywhere in the application.
      </div>
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
