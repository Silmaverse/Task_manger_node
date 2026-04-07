const mongoose =require("mongoose");
const bcrypt = require('bcrypt');
const express=require('express')


const authSchema =new  mongoose.Schema({
    avatar:{
        type:String,
        
    },
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    otp:{
        type:String
    },
    otpExpiry:{
        type:Date,
    }

})

authSchema.pre('save',async function(){
   if(!this.isModified('password')) return ;
   try{
    const saltRounds =10;
    const salt= await bcrypt.genSalt(saltRounds)
    this.password=await bcrypt.hash(this.password ,salt)
    
   }catch(err){
     console.log(err)
     
   }
})

authSchema.methods.comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw error;
  }
};



const user= mongoose.model("user",authSchema)

module.exports= user