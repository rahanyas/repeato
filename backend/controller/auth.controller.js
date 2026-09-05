import { passHashing, verifyPass } from "../helpers/passHash.helpers.js";
import isValid from '../helpers/credentials.helpers.js';
import userModal from "../model/auth.model.js";
import createToken from "../helpers/tokenCreation.js";
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
  try {
    const {email, name, pass} = req.body

    if(!email || !name || !pass){
      return res.status(400).json({msg : 'Please Enter All Fields'});
    };

    const validEmailChecking = isValid(email);

    if(validEmailChecking !== true){
      return res.status(400).json({msg : 'Please Enter A Vaild Email'});
    };

    const isExistingUser = await userModal.findOne({email : email});
    if(isExistingUser){
      console.log('existing user')
      return res.status(409).json({msg : 'user already exist... please login'})
    }

    const hashedPass = await passHashing(pass);

    if(!hashedPass){
      console.log('hashedPass : ', hashedPass);
      return res.status(400).json({msg : 'something went wrong... please try again'});
    }
    
    const newUser = await userModal.create({
      userName : name,
      email,
      pass: hashedPass
    });

    createToken(newUser._id, res);
    
    return res.status(201).json({msg : 'successfully logedIn'});

  } catch (err) {
    console.log('err from sign in controller : ', err);
    return res.status(500).json({msg :'something went wrong... please try again' })
  }
};

export const login = async (req, res) => {
  try {
    const {email, pass} = req.body;

    const validEmailChecking = isValid(email);

    if(!email || !pass){
      return res.status(400).json({msg : 'please provide credentails'});
    };

    if(validEmailChecking !== true){
      return res.status(400).json({msg : 'please enter a valid email'});
    };


    const isUser = await userModal.findOne({email : email});
    if(!isUser){
      return res.status(400).json({msg : 'User not Exist..., Please Sign-In'});
    };

    const passVerifying = await verifyPass(isUser.pass, pass);

    if(!passVerifying){
      return res.status(400).json({msg : 'Invalid Credentials'});
    };

    createToken(isUser._id ,res);

    return res.status(201).json({msg : 'successfully Loged-in'})

  } catch (err) {
    console.log('error in login function : ', err);
    return res.status(500).json({msg : 'Internal Server Error'});
  }
}