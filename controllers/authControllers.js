const { mailSender } = require("../helpers/mailService");
const { isvalidateEmail, generateNodeOTP, generateaccessToken } = require("../helpers/utils");
const user = require("../models/authSchema");

const registration = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname?.trim())
      return res.status(400).send({ message: "Fullname is required" });
    if (!email) return res.status(400).send({ message: "Email is required" });
    if (!isvalidateEmail)
      return res.status(400).send({ message: "Email is invalid" });
    if (!password)
      return res.status(400).send({ message: "Password is required" });
    const existingemail = await user.findOne({ email });
    console.log(existingemail)
    if(existingemail) return res.status(400).send({message:"This email is alreday registered"})
    let trimeedfullname = fullname.split(" ").join("");
    const otp_num = generateNodeOTP();
    const newuser = new user({
      fullname: trimeedfullname,
      email,
      password,
      otp: otp_num,
      otpExpiry: Date.now() + 5 * 60 * 1000,
    });
    await newuser.save();
    await mailSender({ email, subject: "OTP Verfication Mail", otp: otp_num });

    res.status(200).send("Regsitration successfull");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const existinnguser = await user.findOneAndUpdate({
      email,
      otp,
      otpExpiry: { $lt: Date.now()},
    },{isVerified:true,otp:null},{returnDocument:true});
    if(!existinnguser) return res.status(400).send({message:"Inavlid request"})
    return res.status(400).send({message:"Email verified successfully"})
  } catch (error) {
    console.log(err);
    res.status(500).send("Internal server error")
  }
};

const login = async(req, res) => {
  const {email,password}=req.body;
  try {
    const isuser=await user.findOne({email})
    if(!isuser) return res.status(400).send({message:"Invalid credentials"})
    if(!isuser.isVerified) return res.status(400).send({message:"Email is not verified"})
    const match=await user.comparePassword(password,isuser.password)
    if(!match) return res.status(400).send("Inavlid credentials")
    const accessToken=generateaccessToken({_id:isuser.id,email:isuser.email});
    console.log(accessToken);
    res.cookie("accessToken",accessToken);

    res.status(200).send("Login successfully");
  } catch (err) {
    console.log(err);
  }
};

const userProfile=async(req,res)=>{
    try{
      const userdata=await user.findOne({_id:req.user._id}).select("avatar email fullname")
      if(!userdata){
        return res.status(404).send({message:"User not found"})
      }

      res.status(200).send(userdata)

    }catch(err){
      console.log(err)
    }
}

module.exports = { login, registration, verifyOtp,userProfile };
