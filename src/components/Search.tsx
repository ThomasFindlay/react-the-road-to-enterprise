import { debounce } from '@/helpers/debounce'
import React, { useCallback, useState } from 'react'

type SearchProps = {}

const Search = (props: SearchProps) => {
  const [query, setQuery] = useState('')

  const initSearchApiRequest = useCallback(
    debounce((q: string) => {
      console.log('API REQUEST INITIALISED')
    }, 500),
    []
  )

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value
    setQuery(q)
    initSearchApiRequest(q)
  }
  return (
    <form className="flex flex-col items-start mx-auto max-w-[20rem]">
      <label>Search</label>
      <input
        className="w-full"
        type="text"
        value={query}
        onChange={onChangeQuery}
      />
    </form>
  )
}

export default Search
