import './App.css'
import Search from './components/Search'
import TrackCursor from './components/TrackCursor'

function App() {
  return (
    <div className="App mx-auto max-w-6xl text-center my-8">
      <h1 className="font-semibold text-2xl mb-8">
        React - The Road To Enterprise
      </h1>

      <div className="space-y-8">
        <TrackCursor />
        <Search />
      </div>
    </div>
  )
}

export default App
