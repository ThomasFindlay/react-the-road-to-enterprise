export const throttle = <T extends (...args: any) => unknown>(
  fn: T,
  wait: number
) => {
  let timerId: ReturnType<typeof setTimeout>
  let inThrottle: boolean
  let lastTime: number

  return (...args: Parameters<T>) => {
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
