import { useEffect } from 'react'
import CreateEvent from './components/CreateEvent'
import DisplayEvents from './components/DisplayEvents'
import EventDetails from './components/EventDetails'
import { createEventDate } from './eventsData'
import { useEventsStore, usePastEventsStore } from './eventsStore'

interface EventsManagerProps {}

const EventsManager = (props: EventsManagerProps) => {
  const events = useEventsStore()
  const pastEvents = usePastEventsStore()
  console.log('ev', events, pastEvents)

  useEffect(() => {
    // setTimeout(() => {
    //   events.createEvent({
    //     id: '6',
    //     title: 'Test Match',
    //     startDate: createEventDate(-15),
    //     endDate: createEventDate(-15, 2),
    //   })
    // }, 2000)
  }, [])
  return (
    <div className="grid grid-cols-3 gap-12 mt-8">
      <CreateEvent />
      <DisplayEvents />
      <EventDetails />
    </div>
  )
}

export default EventsManager
