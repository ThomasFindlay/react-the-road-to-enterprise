import create, { GetState, SetState, State, StateCreator } from 'zustand'
import {
  devtools,
  StoreApiWithDevtools,
  StoreApiWithSubscribeWithSelector,
  subscribeWithSelector,
} from 'zustand/middleware'

export const createStoreWithDevtoolsAndSubscribe = <TState extends State>(
  fn: StateCreator<
    TState,
    SetState<TState>,
    GetState<TState>,
    StoreApiWithSubscribeWithSelector<TState> & StoreApiWithDevtools<TState>
  >,
  options?: Parameters<typeof devtools>[1]
) => {
  return create(devtools(subscribeWithSelector(fn), options))
}
