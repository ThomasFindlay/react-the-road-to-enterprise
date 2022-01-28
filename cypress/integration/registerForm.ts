// Helper to go to the next step
const goNext = () => cy.findByText('Next').click()

type UserData = {
  name: string
  surname: string
  address: string
  city: string
  email: string
  password: string
}

describe('User Registration', () => {
  beforeEach(() => {})

  it('Visits the page', () => {})

  it('Fill in the form', () => {})

  it('Submit the form', () => {})
})
