import express from 'express';
import cors from  'cors';
import authRouter from './router/auth.router.js';

const app = express();
const PORT  = process.env.PORT || 8000;

const baseUrl = process.env.NODE_DEV === 'dev' ? process.env.DEV_API : process.env.PROD_API;
console.log(baseUrl)

app.use(cors({
  origin : baseUrl,
  credentials : true
}));

app.use(express.json());

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log('server running on port : ', PORT)
})