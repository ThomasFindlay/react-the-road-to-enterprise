import { atom } from 'jotai'
import { events } from './eventsData'
import { Event } from './eventsTypes'

const getUpcomingAndPastEvents = (events: Event[]) => {
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
  return {
    upcomingEvents,
    pastEvents,
  }
}

export const eventsAtom = atom(events)

export const createEventAtom = atom(null, (get, set, event: Event) => {
  set(eventsAtom, [...get(eventsAtom), event])
})

export const selectedEventIdAtom = atom<Event['id'] | null>(null)

export const selectedEventAtom = atom((get) => {
  const selectedEventId = get(selectedEventIdAtom)
  if (!selectedEventId) return
  return get(eventsAtom).find((event) => {
    return event.id === selectedEventId
  })
})

export const selectEventAtom = atom(
  null,
  (get, set, eventId: Event['id'] | null) => {
    set(selectedEventIdAtom, eventId)
  }
)

export const upcomingAndPastEventsAtom = atom((get) => {
  return getUpcomingAndPastEvents(get(eventsAtom))
})
