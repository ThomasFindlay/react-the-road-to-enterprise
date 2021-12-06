import { useEventsStore } from '../eventsStore'

type EventDetailsProps = {}

const EventDetails = (props: EventDetailsProps) => {
  const event = useEventsStore((state) =>
    state.events.find((event) => event.id === state.selectedEvent)
  )
  return (
    <div>
      <h2 className="font-semibold text-xl mb-4">Selected Event Details</h2>
      {event ? (
        <ul className="text-left">
          <li>ID: {event.id}</li>
          <li>Title: {event.title}</li>
          <li>Start Date: {event.startDate}</li>
          <li>Start Time: {event.startTime}</li>
          <li>End Date: {event.endDate}</li>
          <li>End Time: {event.endTime}</li>
        </ul>
      ) : (
        <p>Select an event to see more details</p>
      )}
    </div>
  )
}

export default EventDetails
