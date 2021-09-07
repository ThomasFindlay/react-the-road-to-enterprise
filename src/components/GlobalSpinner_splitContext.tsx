import { useGlobalSpinnerContext } from '@/context/GlobalSpinnerContext_splitContext'
import clsx from 'clsx'

type GlobalSpinnerProps = {}

const GlobalSpinner = (props: GlobalSpinnerProps) => {
  const { isSpinnerVisible } = useGlobalSpinnerContext()

  return (
    <div className="relative">
      <div
        className={clsx(
          'z-40 min-h-screen min-w-screen bg-gray-900 bg-opacity-40 fixed top-0 left-0 right-0 bottom-0 items-center justify-center',
          isSpinnerVisible ? 'flex' : 'hidden'
        )}
      >
        <div className="w-64 h-48 bg-white rounded-lg flex items-center justify-center">
          <svg
            className="animate-spin h-12 w-12 text-indigo-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
      <slot />
    </div>
  )
}

export default GlobalSpinner
