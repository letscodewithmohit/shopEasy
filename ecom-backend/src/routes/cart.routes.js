import express from 'express';
import { addToCart, clearCart, getCart, updateCart } from '../controllers/cart.controller.js';
import { authMiddleware } from '../middlewares/auth.Middleware.js';

const router = express.Router();

// Add to cart
router.post('/add', authMiddleware, addToCart);
router.get('/', authMiddleware, getCart);
router.patch('/update', authMiddleware, updateCart);
router.delete('/clear', authMiddleware, clearCart);


export default router;

 