import ConfiguredAlert from './configuration/Alert'

type CompositionConfigurationProps = {}

const CompositionConfiguration = (props: CompositionConfigurationProps) => {
  return (
    <div>
      <h3 className="text-md md:text-lg font-semibold mb-4">
        Alert components
      </h3>
      <div className="max-w-[30rem] mx-auto space-y-4">
        <ConfiguredAlert
          show
          showIcon
          variant="success"
          headerText="Success"
          text="Your action was completed successfully!"
          onClose={() => {}}
        />
        <ConfiguredAlert
          show
          showIcon
          variant="info"
          headerText="Helpful tip"
          text="This is a helpful information."
          onClose={() => {}}
        />
        <ConfiguredAlert
          show
          showIcon
          variant="error"
          headerText="Validation Error"
          text="There was a problem with validating the form"
          onClose={() => {}}
        />
      </div>
    </div>
  )
}

export default CompositionConfiguration
