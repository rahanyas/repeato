import mongoose from 'mongoose';

export default async function connect_db(uri){
  try {
   await mongoose.connect(uri);
   console.log('mongodb connected');
  } catch (err) {
    console.log('database connection failed : ', err);
    throw err.message
  }
}