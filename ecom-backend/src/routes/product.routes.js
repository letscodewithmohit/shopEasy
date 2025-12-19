import express from 'express';

import { createProduct,deleteProduct,getAllProducts,getProductById, updateProduct} from '../controllers/product.controller.js';

import  {authMiddleware} from '../middlewares/auth.Middleware.js';
import {adminMiddleware} from "../middlewares/admin.Middleware.js"
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

// Route to create a new product (Admin only)
router.post('/create-product', authMiddleware, adminMiddleware,upload.single("image") ,createProduct);

// Route to update a product (Admin only)
router.patch('/update-product/:id', authMiddleware, adminMiddleware,updateProduct);

// Route to delete a product (Admin only)
router.delete('/delete-product/:id',authMiddleware,adminMiddleware,deleteProduct)

// Route to get all products
router.get('/', getAllProducts);

// Route to get a product by ID
router.get('/single-product/:id', getProductById);

export default router;