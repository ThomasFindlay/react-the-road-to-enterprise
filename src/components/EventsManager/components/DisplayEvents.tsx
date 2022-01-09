import { useState } from 'react'
import { useAtom } from 'jotai'
import { useUpdateAtom, useAtomValue } from 'jotai/utils'

import {
  eventsAtom,
  selectEventAtom,
  upcomingAndPastEventsAtom,
} from '../eventsAtoms'
import type { Event } from '../eventsTypes'
import EventsTabs, { EventTab } from './EventsTabs'
type DisplayEventsProps = {}

const DisplayEvents = (props: DisplayEventsProps) => {
  const [eventsToShow, setEventsToShow] = useState<EventTab>('all')
  const [allEvents] = useAtom(eventsAtom)
  const selectEvent = useUpdateAtom(selectEventAtom)
  const { upcomingEvents, pastEvents } = useAtomValue(upcomingAndPastEventsAtom)

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
