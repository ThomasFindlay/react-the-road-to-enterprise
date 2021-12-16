import { Draft } from 'immer'
import create, { GetState, State, StateCreator, StoreApi } from 'zustand'
import {
  devtools,
  StoreApiWithDevtools,
  StoreApiWithSubscribeWithSelector,
  subscribeWithSelector,
} from 'zustand/middleware'
import { withImmer } from '../middleware/withImmer'

export const createStoreWithSubscribe = <T extends State>(
  config: StateCreator<
    T,
    (
      partial: ((draft: Draft<T>) => void) | T | Partial<T>,
      replace?: boolean
    ) => void,
    GetState<T>,
    StoreApiWithSubscribeWithSelector<T> & StoreApiWithDevtools<T> & StoreApi<T>
  >,
  options: Parameters<typeof devtools>[1]
) => {
  return create(devtools(subscribeWithSelector(withImmer(config)), options))
}
