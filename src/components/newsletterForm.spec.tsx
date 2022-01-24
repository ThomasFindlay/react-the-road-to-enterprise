import NewsletterForm from './NewsletterForm'
import { render } from 'test-utils'

const renderNewsletterForm = () => {
  return render(<NewsletterForm />)
}

describe('NewsletterForm.tsx', () => {
  it('Should show an error message if submitting without filling in all the fields.', async () => {})

  it('Should show a success message when the users joins the newsletter', async () => {})

  it('Should show an error if the request to join the newsletter fails.', async () => {})
})
