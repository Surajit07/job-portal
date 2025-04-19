import express from 'express';
import {signup, login, resetPassword, forgotPassword} from '../controllers/authcontrollers.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password/:token',resetPassword);

export default router;