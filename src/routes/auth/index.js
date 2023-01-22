import express from 'express';
import { authenticate, verifySignUp, logout } from '../../middleware/auth.js';

const router = express.Router();

router.post('/signup', verifySignUp);
router.post('/login', authenticate);
router.get('/logout', logout);

export default router;
