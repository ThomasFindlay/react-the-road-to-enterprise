export const debounce = (fn: (...args: any) => unknown, delay: number) => {
  let timerId: ReturnType<typeof setTimeout>

  return (...args: any) => {
    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => fn(...args), delay)
  }
}
