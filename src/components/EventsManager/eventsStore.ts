import create, { GetState, SetState } from 'zustand'
import {
  StoreApiWithDevtools,
  StoreApiWithSubscribeWithSelector,
  subscribeWithSelector,
} from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
import { events } from './eventsData'
import type { Event } from './eventTypes'

export type EventsState = {
  events: typeof events
  selectedEvent: Event['id']
  selectEvent: (id: string) => void
  createEvent: (event: Event) => void
}

export const useEventsStore = create<
  EventsState,
  SetState<EventsState>,
  GetState<EventsState>,
  StoreApiWithSubscribeWithSelector<EventsState> &
    StoreApiWithDevtools<EventsState>
>(
  devtools(
    subscribeWithSelector((set) => ({
      events: [...events],
      selectEvent: (id: string) => {
        set({ selectedEvent: id })
      },
      createEvent: (event) => {
        set((state) => ({
          events: [...state.events, event],
        }))
      },
      selectedEvent: '',
    })),
    {
      name: 'Events',
    }
  )
)

export type PastEventsState = {
  events: typeof events
}

export const usePastEventsStore = create<
  PastEventsState,
  SetState<PastEventsState>,
  GetState<PastEventsState>,
  StoreApiWithDevtools<PastEventsState>
>(
  devtools(
    (set) => ({
      events: [],
    }),
    {
      name: 'PastEvents',
    }
  )
)

useEventsStore.subscribe(
  (state) => state.events,
  (events) => {
    const pastEvents = events.filter((event) => {
      const [day, month, year] = event.startDate
        .split('/')
        .map((item) => parseInt(item))

      return new Date(year, month - 1, day) < new Date()
    })
    usePastEventsStore.setState({
      events: pastEvents,
    })
  },
  { fireImmediately: true }
)

// const deriveState = <
//   SourceState extends Record<string, unknown>,
//   SelectorSlice
// >(
//   sourceStore: SourceState,
//   selector: <StateSlice>(
//     selector: StateSelector<SourceState, StateSlice>
//   ) => SelectorSlice,
//   listener: StateSliceListener<StateSlice>,
//   listenerOptions = {},
//   devtoolsOptions = {}
// ) => {
//   const useListenerStore = create(
//     devtools(
//       subscribeWithSelector((set) => ({})),
//       devtoolsOptions
//     )
//   )

//   const unsubscribeListener = sourceStore.subscribe(
//     selector,
//     listener,
//     listenerOptions
//   )

//   return [useListenerStore, unsubscribeListener]
// }
