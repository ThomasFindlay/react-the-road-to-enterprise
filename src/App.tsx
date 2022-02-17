import './App.css'
import CompositionConfiguration from './components/composition-configuration/CompositionConfiguration'
import DisplayBlogPosts from './components/hocs/DisplayBlogPosts'
import SiblingCommunication from './components/observer/SiblingCommunication'
import PolymorphicComponents from './components/polymorphic/PolymorphicComponents'
import DisplayUsers from './components/render-props/DisplayUsers'
import WrapperComponent from './components/wrapper/WrapperComponent'

function App() {
  return (
    <div className="App mx-auto max-w-6xl text-center my-8">
      <h1 className="font-semibold text-2xl mb-4">
        React - The Road To Enterprise
      </h1>
      <div className="space-y-12">
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Higher Order Components
          </h2>
          <DisplayBlogPosts />
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Render Props
          </h2>
          <DisplayUsers />
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Polymorhpic Components
          </h2>
          <PolymorphicComponents />
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Wrapper Component
          </h2>
          <WrapperComponent />
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Observer Pattern
          </h2>
          <SiblingCommunication />
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Composition vs Configuration
          </h2>
          <CompositionConfiguration />
        </div>
      </div>
    </div>
  )
}

export default App
