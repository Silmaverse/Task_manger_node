const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


function generateNodeOTP() {
  // Generates a secure random integer between 1000 and 9999
  return crypto.randomInt(1000, 10000).toString();
}

function isvalidateEmail(email) {
    return emailRegex.test(email);
}

const generateaccessToken=(user)=>{
   const token=jwt.sign(user,process.env.JWT_SECRET_KEY);
   return token;
}

function slugify(text) {
  return text
    .toString()                     // Cast to string (if not already)
    .normalize('NFD')               // Decompose accented characters (e.g., 'é' -> 'e' + '´')
    .replace(/[\u0300-\u036f]/g, '') // Remove the accent marks
    .toLowerCase()                  // Convert to lowercase
    .trim()                         // Remove whitespace from both ends
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '')        // Remove all non-word characters (except hyphens)
    .replace(/--+/g, '-');          // Replace multiple hyphens with a single one
}


module.exports={isvalidateEmail,generateNodeOTP,generateaccessToken,slugify}