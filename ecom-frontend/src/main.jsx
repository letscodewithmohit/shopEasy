import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import './index.css'


console.log("API BASE:", import.meta.env.VITE_API_BASE_URL);

createRoot(document.getElementById('root')).render(
<Provider store={store}>
 <App />
</Provider>
)
