export type Event = {
  id: string
  title: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
}

export type EventsQueryState = {
  allEvents: Event[]
  upcomingEvents: Event[]
  pastEvents: Event[]
}
