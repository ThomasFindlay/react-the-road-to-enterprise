import { Draft } from 'immer'
import create, { GetState, State, StateCreator, StoreApi } from 'zustand'
import {
  devtools,
  persist,
  PersistOptions,
  StoreApiWithDevtools,
  StoreApiWithPersist,
  StoreApiWithSubscribeWithSelector,
  subscribeWithSelector,
} from 'zustand/middleware'
import { withImmer } from '../middleware/withImmer'

export const createStoreWithPersistAndSubscribe = <T extends State>(
  config: StateCreator<
    T,
    (
      partial: ((draft: Draft<T>) => void) | T | Partial<T>,
      replace?: boolean
    ) => void,
    GetState<T>,
    StoreApiWithSubscribeWithSelector<T> &
      StoreApiWithPersist<T> &
      StoreApiWithDevtools<T> &
      StoreApi<T>
  >,
  persistOptions: PersistOptions<T>,
  options: Parameters<typeof devtools>[1]
) => {
  return create(
    devtools(
      subscribeWithSelector(persist(withImmer(config), persistOptions)),
      options
    )
  )
}
