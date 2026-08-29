import express from 'express';
import cors from  'cors';
import authRouter from './router/auth.router.js';
import connect_db from './utils/db_connection.js';

const app = express();
const PORT  = process.env.PORT || 8000;
const db_uri = process.env.DB_URI;
const baseUrl = process.env.NODE_DEV === 'dev' ? process.env.DEV_API : process.env.PROD_API;
console.log(baseUrl);

await connect_db(db_uri)

app.use(cors({
  origin : baseUrl,
  credentials : true
}));

app.use(express.json());

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log('server running on port : ', PORT)
})