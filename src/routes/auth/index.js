import express from 'express';
import { authenticate, verifySignUp } from '../../middleware/auth.js';

const router = express.Router();

router.post('/signup', verifySignUp);
router.post('/login', authenticate);

export default router;
