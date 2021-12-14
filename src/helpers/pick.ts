export const pick = <T, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Pick<T, K> => {
  let picked: any = {}
  for (const key of keys) {
    picked[key] = obj[key]
  }

  return picked
}
