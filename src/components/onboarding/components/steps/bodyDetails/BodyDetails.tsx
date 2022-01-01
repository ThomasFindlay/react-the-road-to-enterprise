import BodyHeight from './components/BodyHeight'
import BodyWeight from './components/BodyWeight'

type BodyDetailsProps = {}

const BodyDetails = (props: BodyDetailsProps) => {
  return (
    <div className="space-y-8">
      <BodyHeight />
      <hr />
      <BodyWeight />
    </div>
  )
}

export default BodyDetails
