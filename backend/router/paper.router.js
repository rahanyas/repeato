import express from 'express';

import authMiddleware from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js';
import { 
  uploadPaper,
  getPapers
 } from '../controller/paper.controller.js';

const router = express.Router();

router.post('/upload', authMiddleware, upload.single("paper"), uploadPaper);

router.get('/', authMiddleware, getPapers)

export default router;