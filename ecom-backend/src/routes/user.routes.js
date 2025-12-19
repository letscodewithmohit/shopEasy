import express from 'express';
import { authMiddleware } from '../middlewares/auth.Middleware.js';
import { getUserProfile } from '../controllers/user.controller.js';

const router = express.Router();

// Protected route to get user profile

router.get('/profile', authMiddleware, getUserProfile);

export default router;