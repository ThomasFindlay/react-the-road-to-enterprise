export const throttle = <T extends unknown[]>(
  fn: (...args: T) => unknown,
  wait: number
) => {
  let timerId: ReturnType<typeof setTimeout>
  let inThrottle: boolean
  let lastTime: number

  return (...args: T) => {
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
