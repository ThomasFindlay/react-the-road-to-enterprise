import Button from './Button'

type PolymorphicComponentsProps = {}

const PolymorphicComponents = (props: PolymorphicComponentsProps) => {
  return (
    <div>
      <h3 className="text-md md:text-lg font-semibold mb-4">
        PolymorphicComponents
      </h3>
      <div>
        <Button type="button">I am a button</Button>
        <Button as="a" href="https://theroadtoenterprise.com">
          I am a link
        </Button>
      </div>
    </div>
  )
}

export default PolymorphicComponents
