import {
  createStoreWithPersist,
  createStoreWithPersistAndSubscribe,
} from '@/store/helpers'
import { events } from './eventsData'
import type { Event } from './eventsTypes'

export type EventsState = {
  events: typeof events
  selectedEvent: Event['id']
  selectEvent: (id: string) => void
  createEvent: (event: Event) => void
}

export const useEventsStore = createStoreWithPersistAndSubscribe<EventsState>(
  (set) => ({
    events: [...events],
    selectEvent: (id: string) => {
      set({ selectedEvent: id })
    },
    createEvent: (event) => {
      set((state) => {
        state.events.push(event)
      })
    },
    selectedEvent: '',
  }),
  {
    name: 'STORAGE_Events',
  },
  {
    name: 'Events',
  }
)

export type UpcomingAndPastEventsState = {
  pastEvents: typeof events
  upcomingEvents: typeof events
}

export const useUpcomingAndPastEventsStore =
  createStoreWithPersist<UpcomingAndPastEventsState>(
    (set) => ({
      pastEvents: [],
      upcomingEvents: [],
    }),
    {
      name: 'STORAGE_UpcomingAndPastEvents',
    },
    {
      name: 'UpcomingAndPastEvents',
    }
  )

useEventsStore.subscribe(
  (state) => state.events,
  (events) => {
    const upcomingEvents: Event[] = []
    const pastEvents: Event[] = []
    for (const event of events) {
      const [day, month, year] = event.endDate
        .split('/')
        .map((item) => parseInt(item))
      const [hour, minute] = event.endTime.split(':')
      const isUpcoming =
        new Date(year, month - 1, day, parseInt(hour), parseInt(minute)) >
        new Date()

      if (isUpcoming) {
        upcomingEvents.push(event)
      } else {
        pastEvents.push(event)
      }
    }

    useUpcomingAndPastEventsStore.setState({
      pastEvents,
      upcomingEvents,
    })
  },
  { fireImmediately: true }
)
