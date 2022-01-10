import { QueryClient, QueryClientProvider } from 'react-query'
import EventsManager from './components/EventsManager/EventsManager'
import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App mx-auto max-w-6xl text-center my-8">
        <h1 className="font-semibold text-2xl">
          React - The Road To Enterprise
        </h1>

        <EventsManager />
      </div>
    </QueryClientProvider>
  )
}

export default App
