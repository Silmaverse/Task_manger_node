const nodemailer = require("nodemailer");
const OTPMailTemp=require("../helpers/mailTemplate")

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: "silmasubah105@gmail.com",
    pass: "qesz isan hwah dqha",
  },
});

const mailSender=async({email,subject,otp})=>{
    try{

        await transporter.sendMail({
            from: '"TaskManager Team" <team@example.com>', // sender address
            to: email, // list of recipients
            subject: subject, // subject line
            html: OTPMailTemp(otp),
            
        });
    }catch(err){
        console.log('Error while sending mail',err);
    }
}

module.exports={mailSender}