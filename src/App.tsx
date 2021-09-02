import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css'
import FetchTopQuotes from '@/components/FetchTopQuotes'
import UpdateQuotes from '@/components/UpdateQuotes'
import PaginatedQuotes from '@/components/PaginatedQuotes'
import InfiniteScrollQuotes from '@/components/InfiniteScrollQuotes'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="App mx-auto max-w-6xl text-center my-8">
          <h1 className="font-semibold text-2xl">
            React - The Road To Enterprise
          </h1>
          <UpdateQuotes />
          <FetchTopQuotes />
          <PaginatedQuotes />
          <InfiniteScrollQuotes />
        </div>
      </QueryClientProvider>
    </>
  )
}

export default App
