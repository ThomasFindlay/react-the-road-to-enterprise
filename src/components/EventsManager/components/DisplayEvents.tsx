import { useEffect, useState } from 'react'
import shallow from 'zustand/shallow'
import {
  EventsState,
  PastEventsState,
  useEventsStore,
  usePastEventsStore,
} from '../eventsStore'
import type { Event } from '../eventsTypes'
import EventsTabs, { EventTab } from './EventsTabs'

type DisplayEventsProps = {}

const useUpcomingEvents = (events: Event[]) => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  useEffect(() => {
    setUpcomingEvents(upcomingEventsSelector(events))
  }, [events])

  return [upcomingEvents, setUpcomingEvents] as const
}

const upcomingEventsSelector = (events: Event[]) => {
  return events.filter((event) => {
    const [day, month, year] = event.endDate
      .split('/')
      .map((item) => parseInt(item))
    const [hour, minute] = event.endTime.split(':')
    return (
      new Date(year, month - 1, day, parseInt(hour), parseInt(minute)) >
      new Date()
    )
  })
}

const pastEventsSelector = (state: PastEventsState) => state.events

const DisplayEvents = (props: DisplayEventsProps) => {
  const [eventsToShow, setEventsToShow] = useState<EventTab>('all')
  const { allEvents, selectEvent } = useEventsStore(
    (state: EventsState) => ({
      allEvents: state.events,
      selectEvent: state.selectEvent,
    }),
    shallow
  )

  const [upcomingEvents] = useUpcomingEvents(allEvents)
  const pastEvents = usePastEventsStore(pastEventsSelector)

  const eventsMap: Record<EventTab, Event[]> = {
    all: allEvents,
    upcoming: upcomingEvents,
    past: pastEvents,
  }

  const events = eventsMap[eventsToShow]

  return (
    <div>
      <h2 className="font-semibold text-xl mb-6">Events</h2>
      <EventsTabs activeTab={eventsToShow} setActiveTab={setEventsToShow} />
      <div className="mt-4">
        <ul className="text-left shadow py-4 space-y-3 divide-y">
          {Array.isArray(events) && events.length ? (
            events.map((event) => {
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
          ) : (
            <p className="mx-4">No events</p>
          )}
        </ul>
      </div>
    </div>
  )
}

export default DisplayEvents
