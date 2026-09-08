import express from 'express';
import { login, signUp, Logout, googleLogin } from '../controller/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
authMiddleware
const router = express.Router();

router.post('/sign-in', signUp);
router.post('/login', login);
router.get('/checkauth', authMiddleware, (req, res) => {
  res.json({
    user : req.user
  })
});
router.post('/logout', Logout);
router.post('/google', googleLogin);

export default router;