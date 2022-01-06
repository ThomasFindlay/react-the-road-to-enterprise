import { get } from 'lodash-es'

export type FieldErrorProps = {
  error: boolean
  errorMessage?: string
}

export const getErrorProps = <T extends object | undefined, S extends string>(
  value: T,
  path: S
): FieldErrorProps => {
  const errorField = get(value, path)
  if (errorField) {
    return {
      error: true,
      errorMessage: errorField.message,
    }
  } else {
    return {
      error: false,
      errorMessage: '',
    }
  }
}
