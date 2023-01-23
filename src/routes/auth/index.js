import express from 'express';
import { authenticate, signUp, logout } from '../../middleware/auth.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', authenticate);
router.get('/logout', logout);

export default router;
