import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from '@/App'
import reportWebVitals from './reportWebVitals'
import { persistor, store } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
