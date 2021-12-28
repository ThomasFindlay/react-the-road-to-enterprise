import { withImmer } from '@/store/middleware/withImmer'
import create, { GetState, SetState } from 'zustand'
import {
  StoreApiWithDevtools,
  StoreApiWithSubscribeWithSelector,
  subscribeWithSelector,
} from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
import type { Event } from './eventsTypes'

export type EventsState = {
  selectedEvent: Event['id']
  selectEvent: (id: string) => void
}

export const useEventsStore = create<
  EventsState,
  SetState<EventsState>,
  GetState<EventsState>,
  StoreApiWithSubscribeWithSelector<EventsState> &
    StoreApiWithDevtools<EventsState>
>(
  devtools(
    subscribeWithSelector(
      withImmer((set) => ({
        selectEvent: (id: string) => {
          set({ selectedEvent: id })
        },
        selectedEvent: '',
      }))
    ),
    {
      name: 'Events',
    }
  )
)
