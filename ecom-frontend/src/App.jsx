import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <AppRoutes/>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
