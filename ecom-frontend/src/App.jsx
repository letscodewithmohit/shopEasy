import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart } from './features/cart/cartSlice'
import MainLayout from './components/layout/MainLayout'
import { Toaster } from "react-hot-toast";

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

    <MainLayout>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
        <AppRoutes/>
    </MainLayout>
     
    

    </BrowserRouter>
  )
}

export default App
