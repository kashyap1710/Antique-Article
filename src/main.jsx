import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {provdier} from 'react-redux'
import store from './store/store.js'   

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <provider store={store}>
      <App />
    </provider>
  </StrictMode>,
)
