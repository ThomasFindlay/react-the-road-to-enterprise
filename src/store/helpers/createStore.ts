import { Draft } from 'immer'
import create, { GetState, State, StateCreator, StoreApi } from 'zustand'
import { devtools, StoreApiWithDevtools } from 'zustand/middleware'
import { withImmer } from '../middleware/withImmer'

export const createStore = <T extends State>(
  config: StateCreator<
    T,
    (
      partial: ((draft: Draft<T>) => void) | T | Partial<T>,
      replace?: boolean
    ) => void,
    GetState<T>,
    StoreApiWithDevtools<T> & StoreApi<T>
  >,
  options: Parameters<typeof devtools>[1]
) => {
  return create(devtools(withImmer(config), options))
}
