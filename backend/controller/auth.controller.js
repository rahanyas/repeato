import { passHashing, verifyPass } from "../helpers/passHash.helpers.js";
import isValid from '../helpers/credentials.helpers.js';
import userModal from "../model/auth.model.js";

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


    return res.status(201).json({msg : 'successfully logedIn'});

  } catch (err) {
    console.log('err from sign in controller : ', err);
    return res.status(500).json({msg :'something went wrong... please try again' })
  }
}