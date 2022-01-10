import { atom } from 'jotai'
import { Event } from './eventsTypes'

// Store the currently selected event ID
export const selectedEventIdAtom = atom<Event['id'] | null>(null)

// Update the selectedEventIdAtom with the currently selected event ID
export const selectEventAtom = atom(
  null,
  (get, set, eventId: Event['id'] | null) => {
    set(selectedEventIdAtom, eventId)
  }
)
