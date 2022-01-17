import { useEffect, useState } from 'react'

export const useMousePosition = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e
      setPosition({
        x,
        y,
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return position
}
