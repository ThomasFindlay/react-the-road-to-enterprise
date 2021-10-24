import clsx from 'clsx'

const SIZES = {
  xs: 'w-2 h-2',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-10 h-10',
  '2xl': 'w-12 h-12',
}

export type SpinnerProps = {
  show: Boolean
  size?: keyof typeof SIZES
}

const Spinner = (props: SpinnerProps) => {
  const { size = 'md' } = props
  return props.show ? (
    <div className="inline-block">
      <svg
        className={clsx('animate-spin text-indigo-700', SIZES[size])}
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
  ) : null
}

export default Spinner
