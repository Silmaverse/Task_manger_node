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


module.exports={isvalidateEmail,generateNodeOTP,generateaccessToken}