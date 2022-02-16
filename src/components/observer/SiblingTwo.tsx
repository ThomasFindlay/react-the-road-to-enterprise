import { useEffect, useState } from 'react'
import { emitter } from './counterObserver'

type SiblingTwoProps = {}

const SiblingTwo = (props: SiblingTwoProps) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const onIncrement = () => {
      setCount((count) => count + 1)
    }

    const onDecrement = () => {
      setCount((count) => count - 1)
    }

    emitter.on('increment', onIncrement)
    emitter.on('decrement', onDecrement)
    return () => {
      emitter.off('increment', onIncrement)
      emitter.off('decrement', onDecrement)
    }
  }, [])

  return <div>Count: {count}</div>
}

export default SiblingTwo
