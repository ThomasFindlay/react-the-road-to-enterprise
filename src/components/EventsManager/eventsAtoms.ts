import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { withImmer } from 'jotai/immer'
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

// Events array state
export const eventsAtom = withImmer(atomWithStorage('events', events))

// Add a new event to the events array
export const createEventAtom = atom(null, (get, set, event: Event) => {
  set(eventsAtom, (eventsDraft) => eventsDraft.push(event))
})

// Store the currently selected event ID
export const selectedEventIdAtom = atom<Event['id'] | null>(null)

// Return the selected event based on the selectedEventIdAtom
export const selectedEventAtom = atom((get) => {
  const selectedEventId = get(selectedEventIdAtom)
  if (!selectedEventId) return
  return get(eventsAtom).find((event) => {
    return event.id === selectedEventId
  })
})

// Update the selectedEventIdAtom with the currently selected event ID
export const selectEventAtom = atom(
  null,
  (get, set, eventId: Event['id'] | null) => {
    set(selectedEventIdAtom, eventId)
  }
)

// Derive upcoming and past events from the eventsAtom
export const upcomingAndPastEventsAtom = atom((get) => {
  return getUpcomingAndPastEvents(get(eventsAtom))
})
