type BusinessCardPreviewProps = {
  avatar: string
  name: string
  phoneNumber: string
  description: string
  address: string
}

const BusinessCardPreview = (props: BusinessCardPreviewProps) => {
  const { avatar, name, phoneNumber, description, address } = props
  return (
    <div>
      <div className="shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-8">Business Card Preview</h2>
        <div className="flex">
          <div
            className="w-32 h-32 rounded-full bg-gray-100 mr-6 
                      flex-shrink-0 overflow-hidden"
          >
            {avatar ? (
              <img
                src={avatar}
                className="h-full w-full object-cover"
                alt="Avatar"
              />
            ) : null}
          </div>
          <div className="flex flex-col flex-grow">
            <p className="font-semibold text-2xl mb-3">{name}</p>
            <p className="text-gray-700 mb-4">{description}</p>
            <div className="flex justify-between mt-auto">
              <p className="text-gray-500">{address}</p>
              <p className="text-gray-500">{phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessCardPreview
