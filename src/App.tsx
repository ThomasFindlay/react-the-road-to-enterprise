import './App.css'
import GlobalSpinnerExample from './components/GlobalSpinnerExample'
import GlobalSpinnerContextProvider from './context/GlobalSpinnerContext'

function App() {
  return (
    <GlobalSpinnerContextProvider>
      <div className="App mx-auto max-w-6xl text-center my-8">
        <h1 className="font-semibold text-2xl">
          React - The Road To Enterprise
        </h1>
        <GlobalSpinnerExample />
      </div>
    </GlobalSpinnerContextProvider>
  )
}

export default App
