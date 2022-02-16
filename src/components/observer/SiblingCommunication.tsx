import SiblingOne from './SiblingOne'
import SiblingTwo from './SiblingTwo'

type SiblingCommunicationProps = {}

const SiblingCommunication = (props: SiblingCommunicationProps) => {
  return (
    <div>
      <h3 className="text-md md:text-lg font-semibold mb-4">
        Sibling Communication
      </h3>
      <div className="flex items-center justify-center space-x-4">
        <SiblingOne />
        <SiblingTwo />
      </div>
    </div>
  )
}

export default SiblingCommunication
