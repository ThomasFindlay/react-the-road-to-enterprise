import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import AddProduct from './views/products/AddProduct'
import DeleteProduct from './views/products/DeleteProduct'
import EditProduct from './views/products/EditProduct'
import Products from './views/products/Products'
import ViewProduct from './views/products/ViewProduct'

function App() {
  return (
    <div className="App mx-auto max-w-6xl text-center my-8">
      <h1 className="font-semibold text-2xl">React - The Road To Enterprise</h1>
      <div className="mt-8 ">
        <BrowserRouter>
          <nav className="space-x-4 mb-6">
            <Link to="/products">Browse Products</Link>
            <Link to="/products/add">Add Product</Link>
            <Link to="/products/1/edit">Edit Product</Link>
            <Link to="/products/1/delete">Delete Product</Link>
            <Link to="/products/1">View Product</Link>
          </nav>
          <Routes>
            <Route path="/products">
              <Route index element={<Products />} />
              <Route path="add" element={<AddProduct />} />
              <Route path=":id/edit" element={<EditProduct />} />
              <Route path=":id/delete" element={<DeleteProduct />} />
              <Route path=":id" element={<ViewProduct />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
