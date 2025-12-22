import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart } from './features/cart/cartSlice'

function App() {
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);

  useEffect(()=>{
    if(token){
      dispatch(fetchCart());
    }
  },[token,dispatch])
  return (
    <BrowserRouter>
      <Header/>
      <AppRoutes/>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
