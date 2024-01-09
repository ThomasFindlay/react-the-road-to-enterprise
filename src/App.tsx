import './App.css';
import AnimalExampleWithApiStates from '@/components/AnimalExampleWithApiStates';
import AnimalExampleWithApiStatesConstants from '@/components/AnimalExampleWithApiStatesConstants';
import AnimalExampleWithUseApiStatus from '@/components/AnimalExampleWithUseApiStatus';
import AnimalExampleWithUseApi from '@/components/AnimalExampleWithUseApi';
function App() {
  return (
    <div className='App mx-auto max-w-6xl text-center my-8'>
      <h1>React - The Road To Enterprise</h1>
      <AnimalExampleWithApiStates />
      <AnimalExampleWithApiStatesConstants />
      <AnimalExampleWithUseApiStatus />
      <AnimalExampleWithUseApi />
    </div>
  );
}

export default App;
