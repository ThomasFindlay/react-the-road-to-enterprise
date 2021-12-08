import create, { GetState, SetState, State, StateCreator } from 'zustand'
import {
  devtools,
  StoreApiWithDevtools,
  StoreApiWithSubscribeWithSelector,
  subscribeWithSelector,
} from 'zustand/middleware'
import { ZustandDevtoolsOptions } from '../types'

export const createStoreWithDevtoolsAndSubscribe = <TState extends object>(
  fn: StateCreator<
    TState,
    SetState<TState>,
    GetState<TState>,
    StoreApiWithSubscribeWithSelector<TState> & StoreApiWithDevtools<TState>
  >,
  options?: ZustandDevtoolsOptions
) => {
  return create(devtools(subscribeWithSelector(fn), options))
}
