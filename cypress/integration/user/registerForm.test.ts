// Helper to go to the next step
import type { User } from '../../fixtures/userRegistrationData.types'
const goToNextStep = () => cy.findByText('Next').click()

describe('User Registration', () => {
  beforeEach(() => {
    // Load fixture for each test
    cy.fixture('userRegistrationData.json').as('userData')
  })

  it('Visits the page', () => {
    // Companion App URL
    cy.visit('http://localhost:3000/testing/components')
    cy.findByText('Register form').should('exist')
  })

  it('Fill in the form', () => {
    // Get user data fixture and fill in the form
    cy.get<User>('@userData').then((user) => {
      cy.findByLabelText('Name').type(user.name)
      cy.findByLabelText('Surname').type(user.surname)
      goToNextStep()
      cy.findByLabelText('Address').type(user.address)
      cy.findByLabelText('City').type(user.city)
      goToNextStep()
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
      cy.get('@userData').then((user) => {
        // Check if request body matches with user fixture
        expect(JSON.parse(request.body)).to.eql(user)
      })
    })
    // Welcome message should be displayed
    cy.findByText('Welcome new user!').should('exist')
  })
})
