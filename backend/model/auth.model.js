import mongoose from 'mongoose';

const userScheme = new mongoose.Schema({
  userName : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  pass : {
    type : String,
    required : true
  }
}, {timestamps : true});

const userModal = mongoose.model('Users', userScheme);

export default userModal;