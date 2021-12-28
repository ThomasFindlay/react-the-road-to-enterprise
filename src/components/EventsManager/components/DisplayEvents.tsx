import { useState } from 'react'
import shallow from 'zustand/shallow'
import { EventsState, useEventsStore } from '../eventsStore'
import type { Event } from '../eventsTypes'
import EventsTabs, { EventTab } from './EventsTabs'
import { useQuery } from 'react-query'
import { fetchEvents } from '@/api/eventApi'
import Spinner from '@/components/Spinner'

type DisplayEventsProps = {}

const getUpcomingAndPastEvents = (events: Event[] = []) => {
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

const getEvents = async () => {
  const events = await fetchEvents()

  return {
    allEvents: events || [],
    ...getUpcomingAndPastEvents(events),
  }
}

const DisplayEvents = (props: DisplayEventsProps) => {
  const [eventsToShow, setEventsToShow] = useState<EventTab>('all')
  const {
    data: eventsData,
    isLoading: fetchEventsLoading,
    isSuccess: fetchEventsSuccess,
    isError: fetchEventsError,
  } = useQuery(['events'], getEvents)
  const {
    allEvents = [],
    upcomingEvents = [],
    pastEvents = [],
  } = eventsData || {}

  const { selectEvent } = useEventsStore(
    (state: EventsState) => ({
      selectEvent: state.selectEvent,
    }),
    shallow
  )

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
          {fetchEventsLoading ? (
            <div className="text-center">
              <Spinner show />
            </div>
          ) : null}
          {fetchEventsError ? <p>Could not load events</p> : null}
          {fetchEventsSuccess ? (
            events.length ? (
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
            )
          ) : null}
        </ul>
      </div>
    </div>
  )
}

export default DisplayEvents
