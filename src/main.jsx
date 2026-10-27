import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import startIcon from './assets/images/start.png'

const favicon = document.querySelector('link[rel="icon"]')
if (favicon) favicon.href = startIcon

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
