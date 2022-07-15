import NewsletterForm from './NewsletterForm';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from 'test-utils';

const JOIN_NEWSLETTER_URL = 'https://myserver.com/api/newsletter/join';

const server = setupServer(
  rest.post(JOIN_NEWSLETTER_URL, (req, res, ctx) => {
    return res(ctx.json({ status: 'success', body: req.body }));
  })
);

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

const renderNewsletterForm = () => {
  const utils = render(<NewsletterForm />);
  const nameInput = utils.getByLabelText('Name');
  // const emailInput = utils.getByLabelText('Email')
  const emailInput = utils.getByTestId('emailInput');
  const submitBtn = utils.getByText('Join');
  return {
    nameInput,
    emailInput,
    submitBtn,
    ...utils,
  };
};

describe('NewsletterForm.tsx', () => {
  it('Should show an error message if submitting without filling in all the fields.', async () => {
    const { submitBtn } = renderNewsletterForm();
    fireEvent.click(submitBtn);
    screen.getByText('Please fill in all the fields.');
  });

  it('Should show a success message when the user joins the newsletter', async () => {
    const { nameInput, emailInput, submitBtn } = renderNewsletterForm();
    fireEvent.change(emailInput, {
      target: {
        value: 'myemail@test.com',
      },
    });

    fireEvent.change(nameInput, {
      target: {
        value: 'Thomas',
      },
    });

    fireEvent.click(submitBtn);

    await waitFor(() => screen.getByText('Joining...'));
    await waitFor(() => screen.getByText('You have joined the newsletter!'));
  });

  it('Should show an error if the request to join the newsletter fails.', async () => {
    server.use(
      rest.post(JOIN_NEWSLETTER_URL, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    const { nameInput, emailInput, submitBtn } = renderNewsletterForm();
    fireEvent.change(nameInput, {
      target: {
        value: 'Thomas',
      },
    });

    fireEvent.change(emailInput, {
      target: {
        value: 'myemail@test.com',
      },
    });
    fireEvent.click(submitBtn);

    await waitFor(() => screen.getByText('Joining...'));
    await waitFor(() =>
      screen.getByText(
        'There was a problem while signing you up for the newsletter. Please try again.'
      )
    );
  });
});
