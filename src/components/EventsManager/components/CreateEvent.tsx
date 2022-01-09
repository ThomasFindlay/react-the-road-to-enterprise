import React, { useState } from 'react'
import { useUpdateAtom } from 'jotai/utils'
import { createEventAtom } from '../eventsAtoms'
import { Event } from '../eventsTypes'

type CreateEventProps = {}

const createId = () => '_' + Math.random().toString(36).substr(2, 9)

const initialState: Omit<Event, 'id'> = {
  title: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
}

const formatDate = (date: string) => {
  return date.split('-').reverse().join('/')
}

const CreateEvent = (props: CreateEventProps) => {
  const [form, setForm] = useState(initialState)
  const createEvent = useUpdateAtom(createEventAtom)

  const onCreateEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (
      !form.title ||
      !form.startDate ||
      !form.startTime ||
      !form.endDate ||
      !form.endTime
    )
      return

    createEvent({
      ...form,
      id: createId(),
      startDate: formatDate(form.startDate),
      endDate: formatDate(form.endDate),
    })
    setForm(initialState)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div>
      <h2 className="font-semibold text-xl mb-6">Create event</h2>
      <form className="space-y-3">
        <div className="flex flex-col items-stretch text-left space-y-2">
          <label className="font-semibold" htmlFor="title">
            Title
          </label>
          <input
            className="flex-grow px-4 py-3"
            type="text"
            name="title"
            id="title"
            value={form.title}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col items-stretch text-left space-y-2">
          <label className="font-semibold" htmlFor="startDate">
            Start Date
          </label>
          <input
            className="flex-grow px-4 py-3"
            type="date"
            name="startDate"
            id="startDate"
            value={form.startDate}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col items-stretch text-left space-y-2">
          <label className="font-semibold" htmlFor="startTime">
            Start Time
          </label>
          <input
            className="flex-grow px-4 py-3"
            type="time"
            name="startTime"
            id="startTime"
            value={form.startTime}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col items-stretch text-left space-y-2">
          <label className="font-semibold" htmlFor="endDate">
            End Date
          </label>
          <input
            className="flex-grow px-4 py-3"
            type="date"
            name="endDate"
            id="endDate"
            value={form.endDate}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col items-stretch text-left space-y-2">
          <label className="font-semibold" htmlFor="endTime">
            End Time
          </label>
          <input
            className="flex-grow px-4 py-3"
            type="time"
            name="endTime"
            id="endTime"
            value={form.endTime}
            onChange={onChange}
          />
        </div>
        <button
          className="w-36 self-end bg-blue-700 text-blue-100 px-4 py-3"
          onClick={onCreateEvent}
        >
          Create Event
        </button>
      </form>
    </div>
  )
}

export default CreateEvent
