const { isvalidateEmail } = require("../helpers/utils")
const user = require("../models/authSchema")

const registration =async(req,res)=>{
    console.log(req.body)
    const {fullname , email , password}=req.body

    try{
      
      if(!fullname?.trim()) return res.status(400).send({message:"Fullname is required"})
      if(!email) return res.status(400).send({message:"Email is required"})
      if(!isvalidateEmail) return res.status(400).send({message:"Email is invalid"})
      if(!password) return res.status(400).send({message:"Password is required"});

      const existingemail= await user.findOne({email})
      console.log(existingemail)
      if(existingemail) return res.status(400).send({message:"This email is alreday registered"})
      let trimeedfullname=fullname.split(' ').join('');
      const newuser= new user({fullname:trimeedfullname , email , password})
      console.log(newuser)
      console.log(user)
      await newuser.save()

      res.status(200).send("Regsitration successfull")
    }catch(err){
      console.log(err)
      res.status(500).send('Internal server error')
    }
}

const login =(req,res)=>{
    try{
      res.status(200).send("Login successfully")
    }catch(err){
        console.log(err)
    }
}


module.exports={login,registration}