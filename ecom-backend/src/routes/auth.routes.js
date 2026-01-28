import express from "express";
import {registerUser, loginUser} from '../controllers/auth.controller.js';
import { googleLogin } from "../controllers/authGoogle.controller.js"; 

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);   
// Google login route
router.post("/google", googleLogin);

export default router;