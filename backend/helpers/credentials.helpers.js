export default function isValid(email){

  if(typeof email !== 'string'){
    return false
  }
   if(!email.includes('@') || !email.includes('.com')){
    return false
   }
   return true
}