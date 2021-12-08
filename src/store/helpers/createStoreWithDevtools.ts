import create, { GetState, SetState, State, StateCreator } from 'zustand'
import { devtools, StoreApiWithDevtools } from 'zustand/middleware'
import { ZustandDevtoolsOptions } from '../types'

export const createStoreWithDevtools = <TState extends State>(
  fn: StateCreator<
    TState,
    SetState<TState>,
    GetState<TState>,
    StoreApiWithDevtools<TState>
  >,
  options?: ZustandDevtoolsOptions
) => {
  return create(devtools(fn, options))
}
