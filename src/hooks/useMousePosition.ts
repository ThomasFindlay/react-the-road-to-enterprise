import { useEffect, useState } from 'react'

export type UseMousePositionOptions = {
  throttleTime?: number
}

const throttle = (fn: (...args: any) => unknown, wait: number) => {
  let timerId: ReturnType<typeof setTimeout>
  let inThrottle: boolean
  let lastTime: number

  return (...args: any) => {
    if (!inThrottle) {
      lastTime = Date.now()
      inThrottle = true
    } else {
      clearTimeout(timerId)

      timerId = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn(...args)
          lastTime = Date.now()
        }
      }, Math.max(wait - (Date.now() - lastTime), 0))
    }
  }
}

const debounce = (fn: (...args: any) => unknown, delay: number) => {
  let timerId: ReturnType<typeof setTimeout>

  return (...args: any) => {
    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => fn(...args), delay)
  }
}

export const useMousePosition = (options?: UseMousePositionOptions) => {
  const throttleTime = options?.throttleTime || 200
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const onMouseMoveThrottled = throttle((e) => {
      const { clientX: x, clientY: y } = e
      setPosition({
        x,
        y,
      })
    }, throttleTime)

    window.addEventListener('mousemove', onMouseMoveThrottled)
    return () => window.removeEventListener('mousemove', onMouseMoveThrottled)
  }, [])

  return position
}
