import './App.css';
import Accordion from './components/accordion/Accordion';

const items = [
  {
    heading: 'Heading one',
    content: 'Content one',
  },
  {
    heading: 'Heading two',
    content: 'Content two',
  },
  {
    heading: 'Heading three',
    content: 'Content three',
  },
];

function App() {
  return (
    <div className='App mx-auto max-w-6xl text-center my-8'>
      <h1 className='font-semibold text-2xl'>React - The Road To Enterprise</h1>
      <div className='mt-8 max-w-[20rem] mx-auto'>
        <h2 className='mb-4 text-lg font-semibold'>Accordion</h2>
        <Accordion items={items} />
      </div>
    </div>
  );
}

export default App;
