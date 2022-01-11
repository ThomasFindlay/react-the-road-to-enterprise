import faker from 'faker'
import { useEffect, useState } from 'react'

import './App.css'

type User = {
  id: number
  name: string
  surname: string
  email: string
}

function App() {
  const [items, setItems] = useState<User[]>([])

  useEffect(() => {
    let users = []
    for (let i = 0; i < 10000; i++) {
      users.push({
        id: i,
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        email: faker.internet.email(),
      })
    }
    setItems(users)
    console.log('data ready')
  }, [])

  return (
    <div className="App mx-auto max-w-6xl text-center my-8">
      <h1 className="font-semibold text-2xl">React - The Road To Enterprise</h1>
      <div className="h-64 w-2/3 mx-auto overflow-y-auto mt-16 flex justify-center text-left">
        <div className="w-full relative">
          <div className="flex gap-6 mb-3 font-semibold">
            <span className="w-8">ID</span>
            <span className="w-24">Name</span>
            <span className="w-24">Surname</span>
            <span className="w-24">Email</span>
          </div>
          <div>
            {items.map((item) => {
              return (
                <div key={item.id} className="flex gap-6">
                  <span className="w-8">{item.id}</span>
                  <span className="w-24">{item.name}</span>
                  <span className="w-24">{item.surname}</span>
                  <span className="w-24">{item.email}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
