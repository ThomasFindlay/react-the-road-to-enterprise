import './App.css'
import { useMousePosition } from './hooks/useMousePosition'

function App() {
  const position = useMousePosition()
  return (
    <div className="App mx-auto max-w-6xl text-center my-8">
      <h1 className="font-semibold text-2xl mb-8">
        React - The Road To Enterprise
      </h1>

      <div>
        Last tracked position - x: {position.x}, y: {position.y}
      </div>
    </div>
  )
}

export default App
