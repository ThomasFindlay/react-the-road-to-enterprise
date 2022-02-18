type FormProgressBarProps = {
  step: number
  total: number
}

const FormProgressBar = (props: FormProgressBarProps) => {
  const { step, total } = props
  return (
    <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700">
      <div
        className="bg-indigo-500 h-2.5 rounded"
        style={{
          width: `${(step / total) * 100}%`,
        }}
      ></div>
    </div>
  )
}

export default FormProgressBar
