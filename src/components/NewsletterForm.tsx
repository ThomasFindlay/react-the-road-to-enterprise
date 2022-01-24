import React, { useState } from 'react'

type NewsletterFormProps = {}

const NewsletterForm = (props: NewsletterFormProps) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
  })
  const [joinNewsletterApiStatus, setJoinNewsletterApiStatus] = useState<
    'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR'
  >('IDLE')
  const [error, setError] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }))
    error && setError('')
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (joinNewsletterApiStatus === 'PENDING') return
    setJoinNewsletterApiStatus('PENDING')
    if (!form.name || !form.email) {
      setError('Please fill in all the fields.')
      return
    }
    try {
      const response = await fetch('https://myserver.com/api/newsletter/join', {
        method: 'POST',
        body: JSON.stringify(form),
      })

      if (response.ok) {
        setJoinNewsletterApiStatus('SUCCESS')
        return
      }
      throw new Error(
        'There was a problem while signing you up for the newsletter. Please try again.'
      )
    } catch (error) {
      setJoinNewsletterApiStatus('ERROR')
      setError(
        'There was a problem while signing you up for the newsletter. Please try again.'
      )
    }
  }

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">Sign up for our newsletter</h2>
      {joinNewsletterApiStatus === 'SUCCESS' ? (
        <div>You have joined the newsletter!</div>
      ) : (
        <form onSubmit={onSubmit}>
          <fieldset className="mb-4 flex flex-col space-y-2 items-start">
            <label htmlFor="name">Name</label>
            <input
              className="w-full"
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={onChange}
            />
          </fieldset>
          <fieldset className="mb-4 flex flex-col space-y-2 items-start">
            <label>Email</label>
            <input
              className="w-full"
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={onChange}
            />
          </fieldset>

          {joinNewsletterApiStatus === 'ERROR' || error ? (
            <p className="text-red-700 mb-4">
              {error ||
                'There was a problem while signing you up. Please try again.'}
            </p>
          ) : null}

          <button
            className="px-4 py-3 bg-blue-700 text-blue-100 min-w-[5rem] font-semibold "
            disabled={joinNewsletterApiStatus === 'PENDING'}
            type="submit"
          >
            {joinNewsletterApiStatus === 'PENDING' ? 'Joining...' : 'Join'}
          </button>
        </form>
      )}
    </div>
  )
}

export default NewsletterForm
