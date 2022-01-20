type IngredientsInfoHelperProps = {}

const IngredientsInfoHelper = (props: IngredientsInfoHelperProps) => {
  console.log('IngredientsInfoHelper rendered')
  return (
    <button className="w-5 h-5 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center">
      &#33;
    </button>
  )
}

export default IngredientsInfoHelper
