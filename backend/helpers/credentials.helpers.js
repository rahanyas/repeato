export default function isValid(email){

  if(typeof email !== 'string'){
    return false
  }
   if(!email.includes('@') || !email.includes('.com') || !email.includes('gmail')){
    return false
   }
   return true;
}