import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import ProtectedRoute from '../components/common/ProtectedRoute'
import Cart from '../pages/Cart'
import SingleProduct from '../pages/Products/SingleProduct'
import ProductList from '../pages/Products/ProductList'
import Checkout from '../pages/Checkout'
import OrderSuccess from '../pages/OrderSuccess'
import Profile from '../pages/Profile'
import MyOrders from '../pages/order/MyOrders'
import OrderDetails from '../pages/order/OrderDetails'
import NotFound from "../pages/NotFound";


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

      <Route path="/checkout" element={
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>} />

      <Route path="/order-success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
      <Route path="/orders/:id" element={<ProtectedRoute><OrderDetails /> </ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}

export default AppRoutes