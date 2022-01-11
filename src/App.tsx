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
      <div className="h-64 overflow-y-auto mt-16 flex justify-center">
        <table className="w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              return (
                <tr className="py-4 " key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.surname}</td>
                  <td>{item.email}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
