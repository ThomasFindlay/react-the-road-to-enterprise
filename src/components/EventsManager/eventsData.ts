import type { Event } from './eventTypes'

export const createEventDate = (days = 10, hours = 0) => {
  let date = new Date()
  date.setDate(date.getDate() + days)
  date.setHours(date.getHours() + hours)
  return new Intl.DateTimeFormat().format(date)
}

export const events: Event[] = [
  {
    id: '1',
    title: 'Football Match',
    startDate: createEventDate(10),
    startTime: '12:00',
    endDate: createEventDate(10, 2),
    endTime: '16:00',
  },
  {
    id: '2',
    title: 'Birthday Party',
    startDate: createEventDate(24),
    startTime: '9:00',
    endDate: createEventDate(24, 6),
    endTime: '14:00',
  },
  {
    id: '3',
    title: 'Tech Conference',
    startDate: createEventDate(45),
    startTime: '08:00',
    endDate: createEventDate(45, 4),
    endTime: '18:00',
  },
  {
    id: '4',
    title: 'Board Games Night',
    startDate: createEventDate(-5),
    startTime: '20:00',
    endDate: createEventDate(-5, 3),
    endTime: '23:00',
  },
]
