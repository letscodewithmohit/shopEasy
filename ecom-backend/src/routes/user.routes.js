import express from 'express';
import { authMiddleware } from '../middlewares/auth.Middleware.js';
import { getUserProfile, updateUserProfile } from '../controllers/user.controller.js';

const router = express.Router();

// Protected route to get user profile

router.get('/profile', authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);
export default router;