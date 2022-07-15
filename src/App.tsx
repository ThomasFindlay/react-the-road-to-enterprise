import './App.css';
import NewsletterForm from './components/NewsletterForm';

function App() {
  return (
    <div className='App mx-auto max-w-6xl text-center my-8'>
      <h1 className='font-semibold text-2xl'>React - The Road To Enterprise</h1>
      <div className='mt-8 max-w-[20rem] mx-auto'>
        <NewsletterForm />
      </div>
    </div>
  );
}

export default App;
