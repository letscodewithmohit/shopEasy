import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import ProtectedRoute from '../components/common/ProtectedRoute'
import Cart from '../pages/Cart'
import SingleProduct from '../pages/Products/SingleProduct'
import ProductList from '../pages/Products/ProductList'


const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<SingleProduct />} />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

    </Routes>
  )
}

export default AppRoutes