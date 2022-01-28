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
  beforeEach(() => {
    // Load fixture for each test
    cy.fixture('userRegistrationData.json').as('userData')
  })

  it('Visits the page', () => {
    cy.visit('http://localhost:3000')
    cy.findByText('Register form').should('exist')
  })

  it('Fill in the form', () => {
    cy.get<UserData>('@userData').then((user) => {
      cy.findByLabelText('Name').type(user.name)
      cy.findByLabelText('Surname').type(user.surname)
      goNext()
      cy.findByLabelText('Address').type(user.address)
      cy.findByLabelText('City').type(user.city)
      goNext()
      cy.findByLabelText('Email').type(user.email)
      cy.findByLabelText('Password').type(user.password)
    })
  })

  it('Submit the form', () => {
    // Intercep post-user request so we can check the body
    cy.intercept('POST', '/post-user').as('postUser')

    // Submit the form
    cy.findByText('Submit').click()

    // Wait for the post request and get the request object
    cy.wait('@postUser').then(({ request }) => {
      // Get user
      cy.get<UserData>('@userData').then((user) => {
        // Check if request body matches with user fixture
        expect(JSON.parse(request.body)).to.eql(user)
      })
    })
    // Welcome message should be displayed
    cy.findByText('Welcome new user!').should('exist')
  })
})
