import express from 'express';
import { login, signUp } from '../controller/auth.controller.js';
const router = express.Router();

router.post('/sign-in', signUp);
router.post('/login', login);

export default router;