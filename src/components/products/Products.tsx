import { useLayout } from '@/hooks/useLayout'
import ProductsGrid from './components/layout/ProductsGrid'
import ProductsList from './components/layout/ProductsList'
import ProductGridCard from './components/ProductGridCard'
import ProductListCard from './components/ProductListCard'
import products from './products.json'

type ProductsProps = {}

const LAYOUTS = {
  grid: 'grid',
  list: 'list',
}

const PRODUCT_LAYOUT_COMPONENTS = {
  [LAYOUTS.grid]: ProductsGrid,
  [LAYOUTS.list]: ProductsList,
}

const PRODUCT_CARD_LAYOUTS = {
  [LAYOUTS.grid]: ProductGridCard,
  [LAYOUTS.list]: ProductListCard,
}

const Products = (props: ProductsProps) => {
  const {
    layout,
    setLayout,
    LayoutComponent: ProductLayout,
  } = useLayout(LAYOUTS, PRODUCT_LAYOUT_COMPONENTS, LAYOUTS.grid)

  const ProductCardComponent = PRODUCT_CARD_LAYOUTS[layout]

  return (
    <div>
      <h1 className="text-xl font-semibold mt-8">Products</h1>

      <div className="space-x-4 mb-8 mx-auto flex justify-center items-center mt-4">
        <button onClick={() => setLayout(LAYOUTS.grid)}>Layout grid</button>
        <button onClick={() => setLayout(LAYOUTS.list)}>Layout list</button>
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
