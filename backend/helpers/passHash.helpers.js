import argon2 from 'argon2';

export async function passHashing(pass){
  
    const hashedPass = await argon2.hash(pass, {
      type : argon2.argon2id
    });
    return hashedPass
};

export async function verifyPass(userPass, pass){
  // userPass is the password stored in db,
  // pass is the user enterd pass
  
    const validPass = await argon2.verify(
      userPass,
      pass
    );
    return validPass

}