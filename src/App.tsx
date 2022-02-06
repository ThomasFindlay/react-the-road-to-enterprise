import './App.css'
import Products from './components/products/Products'
function App() {
  return (
    <div className="App mx-auto max-w-6xl text-center my-8">
      <h1 className="font-semibold text-2xl">React - The Road To Enterprise</h1>
      <main>
        <Products />
      </main>
    </div>
  )
}

export default App
