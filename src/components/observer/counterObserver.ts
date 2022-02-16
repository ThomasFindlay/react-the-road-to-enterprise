import mitt from 'mitt'

export type CounterEvent = {
  increment: void
  decrement: void
}
export const emitter = mitt<CounterEvent>()
