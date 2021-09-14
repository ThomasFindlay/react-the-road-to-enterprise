import './App.css'
import ShoppingList from './components/ShoppingList'
import TasksBoard from './components/TasksBoard'
import ShoppingListContextProvider from './context/ShoppingListContext'

function App() {
  return (
    <ShoppingListContextProvider>
      <div className="App mx-auto max-w-6xl text-center my-8">
        <h1 className="font-semibold text-2xl">
          React - The Road To Enterprise
        </h1>
        <TasksBoard />
        <ShoppingList />
      </div>
    </ShoppingListContextProvider>
  )
}

export default App
