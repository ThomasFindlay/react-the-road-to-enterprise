import Button from './Button'

type PolymorphicComponentsProps = {}

const PolymorphicComponents = (props: PolymorphicComponentsProps) => {
  return (
    <div>
      <h3 className="text-md md:text-lg font-semibold mb-4">Button Example</h3>
      <div className="space-x-4">
        <Button type="button" variant="primary">
          I am a button
        </Button>
        <Button as="a" variant="link" href="https://theroadtoenterprise.com">
          I am a link
        </Button>
      </div>
    </div>
  )
}

export default PolymorphicComponents
