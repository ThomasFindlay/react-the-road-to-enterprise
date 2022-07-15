import Accordion from './Accordion';
import { render, fireEvent, screen } from 'test-utils';

const accordionData = [
  {
    heading: 'One',
    content: 'Content one',
  },
  {
    heading: 'Two',
    content: 'Content Two',
  },
  {
    heading: 'Three',
    content: 'Content Three',
  },
];

const renderAccordion = (props = {}) =>
  render(<Accordion items={accordionData} {...props} />);

describe('Accordion.tsx', () => {
  it('Accordion items have correct text', async () => {});

  it('Each accordion item content is hidden at the start', async () => {});

  it('Accordion item content is toggled on header click', async () => {});
});
