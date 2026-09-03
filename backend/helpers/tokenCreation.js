import jwt from 'jsonwebtoken';

export default function createToken(userId, res){
  try {
    if(!userId){
      return res.status(400).json({msg : 'Error in token creation'})
    };

    const token = jwt.sign({id : userId}, process.env.JWT_SECRET, {expiresIn : '2d'});

    if(!token){
      return res.status(400).json({msg : 'token creation failed'});
    };

    res.cookie("token", token, {
      secure : process.env.NODE_DEV !== 'dev',
      sameSite : process.env.NODE_DEV !== 'dev' ? 'None' : 'Lax',
      httpOnly : true,
      maxAge : 2 * 24 * 60 * 1000,
    });
    
  } catch (err) {
    console.log('error in create token : ', err);
    return res.status(500).json({msg : 'Token Generation Failed'})
  }
}