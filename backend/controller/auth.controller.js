import { passHashing, verifyPass } from "../helpers/passHash.helpers.js"

export const signIn = (req, res) => {
  try {
    const {email, name, pass} = req.body

    if(!email || !name || !pass){
      return res.status(400).json('Please Enter All Fields')
    };

    

  } catch (err) {
    console.log('err from sign in controller : ', err)
  }
}