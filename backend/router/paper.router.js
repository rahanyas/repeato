import express from 'express';

import authMiddleware from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js';
import { uploadPaper } from '../controller/paper.controller.js';

const router = express.Router();

router.post('/upload', authMiddleware, upload.single("paper"), uploadPaper);

export default router;