import create, { GetState, SetState, State, StateCreator } from 'zustand'
import { devtools, StoreApiWithDevtools } from 'zustand/middleware'

export const createStoreWithDevtools = <TState extends State>(
  fn: StateCreator<
    TState,
    SetState<TState>,
    GetState<TState>,
    StoreApiWithDevtools<TState>
  >,
  options?: Parameters<typeof devtools>[1]
) => {
  return create(devtools(fn, options))
}
