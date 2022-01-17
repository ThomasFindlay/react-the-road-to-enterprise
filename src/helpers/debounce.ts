export const debounce = <T extends (...args: any) => unknown>(
  fn: T,
  delay: number
) => {
  let timerId: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => fn(...args), delay)
  }
}
