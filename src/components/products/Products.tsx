import { useLayout } from '@/hooks/useLayout'
import ProductsGrid from './components/layout/ProductsGrid'
import ProductsList from './components/layout/ProductsList'
import ProductGridCard from './components/ProductGridCard'
import ProductListCard from './components/ProductListCard'
import products from './products.json'

type Layouts = 'grid' | 'list'

const PRODUCT_LAYOUT_COMPONENTS: Record<
  Layouts,
  typeof ProductsGrid | typeof ProductsList
> = {
  grid: ProductsGrid,
  list: ProductsList,
} as const

const PRODUCT_LAYOUTS_CARD_COMPONENTS: Record<
  Layouts,
  typeof ProductGridCard | typeof ProductListCard
> = {
  grid: ProductGridCard,
  list: ProductListCard,
} as const

type ProductsProps = {}

const Products = (props: ProductsProps) => {
  const {
    layout,
    setLayout,
    LayoutComponent: ProductLayout,
  } = useLayout(PRODUCT_LAYOUT_COMPONENTS, 'grid')

  const ProductCardComponent = PRODUCT_LAYOUTS_CARD_COMPONENTS[layout]
  return (
    <div>
      <h1 className="text-xl font-semibold mt-8">Products</h1>

      <div className="space-x-4 mb-8 mx-auto flex justify-center items-center mt-4">
        <button onClick={() => setLayout('grid')}>Layout grid</button>
        <button onClick={() => setLayout('list')}>Layout list</button>
      </div>
      <div>
        <ProductLayout className="mx-auto max-w-7xl">
          {products.map((product) => {
            return <ProductCardComponent product={product} key={product.id} />
          })}
        </ProductLayout>
      </div>
    </div>
  )
}

export default Products
