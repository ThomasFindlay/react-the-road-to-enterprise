type FormSubmittedProps = {}

const FormSubmitted = (props: FormSubmittedProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24 text-emerald-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div className="text-2xl font-semibold text-emerald-700">
        Welcome on board!
      </div>
    </div>
  )
}

export default FormSubmitted
