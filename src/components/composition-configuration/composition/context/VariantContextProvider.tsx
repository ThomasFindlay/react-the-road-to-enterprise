import { contextFactory } from '@/context/helpers/contextFactory'
import { AlertVariant } from '../../alert.types'

const [useVariant, VariantContext] = contextFactory<AlertVariant>()

export { useVariant }

type VariantContextProviderProps = {
  variant: AlertVariant
  children: React.ReactNode
}

const VariantContextProvider = (props: VariantContextProviderProps) => {
  return (
    <VariantContext.Provider value={props.variant}>
      {props.children}
    </VariantContext.Provider>
  )
}

export default VariantContextProvider
