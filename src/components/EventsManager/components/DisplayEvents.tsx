import {
  EventsState,
  PastEventsState,
  useEventsStore,
  usePastEventsStore,
} from '../eventsStore'
import shallow from 'zustand/shallow'
import { useState } from 'react'
import EventsTabs, { EventTab } from './EventsTabs'
import type { Event } from '../eventsTypes'
type DisplayEventsProps = {}

const pick = <T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> => {
  let picked: any = {}
  for (const key of keys) {
    picked[key] = obj[key]
  }

  return picked
}

const pastEventsSelector = (state: PastEventsState) => state.events
const upcomingEventsSelector = (state: EventsState) => {
  return state.events.filter((event) => {
    const [day, month, year] = event.endDate
      .split('/')
      .map((item) => parseInt(item))
    return new Date(year, month - 1, day) > new Date()
  })
}
const DisplayEvents = (props: DisplayEventsProps) => {
  const [eventsToShow, setEventsToShow] = useState<EventTab>('past')
  const { allEvents, selectEvent } = useEventsStore(
    (state: EventsState) => ({
      allEvents: state.events,
      selectEvent: state.selectEvent,
    }),
    shallow
  )
  const upcomingEvents = useEventsStore(upcomingEventsSelector, shallow)
  const pastEvents = usePastEventsStore(pastEventsSelector)
  console.log('display events re-rendered')
  // const { events, selectEvent } = useEventsStore(
  //   (state) => pick(state, 'events', 'selectEvent'),
  //   shallow
  // )

  const eventsMap: Record<EventTab, Event[]> = {
    all: allEvents,
    past: pastEvents,
    upcoming: upcomingEvents,
  }

  const events = eventsMap[eventsToShow]

  console.log('event to show', eventsToShow)

  return (
    <div>
      <h2 className="font-semibold text-xl mb-4">Events</h2>
      <EventsTabs activeTab={eventsToShow} setActiveTab={setEventsToShow} />
      <div className="mt-4">
        <ul className="space-y-3 text-left">
          {Array.isArray(events)
            ? events.map((event) => {
                return (
                  <li key={event.id} className="space-x-3">
                    <button
                      className="hover:underline"
                      onClick={() => selectEvent(event.id)}
                    >
                      {event.title} - {event.startDate}
                    </button>
                  </li>
                )
              })
            : null}
        </ul>
      </div>
    </div>
  )
}

export default DisplayEvents
