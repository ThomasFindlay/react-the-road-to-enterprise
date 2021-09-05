import { useCallback, useState } from 'react'

export const useToggleState = (defaultValue = false) => {
  const [state, setState] = useState(defaultValue)
  const open = useCallback(() => setState(true), [])
  const close = useCallback(() => setState(false), [])
  const toggle = useCallback(() => setState((state) => !state), [])

  return {
    state,
    open,
    close,
    toggle,
  }
}
