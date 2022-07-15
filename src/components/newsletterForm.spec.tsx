import NewsletterForm from './NewsletterForm';
import { render } from 'test-utils';

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
  it('Should show an error message if submitting without filling in all the fields.', async () => {});

  it('Should show a success message when the user joins the newsletter', async () => {});

  it('Should show an error if the request to join the newsletter fails.', async () => {});
});
