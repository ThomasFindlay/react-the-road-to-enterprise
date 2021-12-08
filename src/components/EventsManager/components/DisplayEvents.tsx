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
  const [eventsToShow, setEventsToShow] = useState<EventTab>('all')
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

  return (
    <div>
      <h2 className="font-semibold text-xl mb-6">Events</h2>
      <EventsTabs activeTab={eventsToShow} setActiveTab={setEventsToShow} />
      <div className="mt-4">
        <ul className="text-left shadow py-4 space-y-3 divide-y">
          {Array.isArray(events)
            ? events.map((event) => {
                return (
                  <li key={event.id} className="-mt-3">
                    <button
                      className="hover:underline pt-3 px-4"
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
