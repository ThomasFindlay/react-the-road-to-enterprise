import './App.css'
import RegistrationForm from './components/RegistrationForm'

function App() {
  return (
    <div className="App mx-auto max-w-6xl text-center my-8">
      <h1 className="font-semibold text-2xl">React - The Road To Enterprise</h1>
      <div className="mt-8 max-w-[40rem] mx-auto">
        <RegistrationForm />
      </div>
    </div>
  )
}

export default App
