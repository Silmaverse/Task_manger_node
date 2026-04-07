const OTPMailTemp= (otp)=>{
  return `<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">

  <table align="center" width="100%" cellpadding="0" cellspacing="0" 
         style="max-width:600px; margin:auto; background-color:#ffffff; border-radius:6px;">

    <tr>
      <td style="padding:20px; text-align:center; background-color:#4CAF50; color:#ffffff; font-size:24px; font-weight:bold;">
        Email Verification
      </td>
    </tr>

    <tr>
      <td style="padding:30px; text-align:center; color:#333333;">
        <p style="font-size:16px; margin-bottom:20px;">
          Hello,
        </p>

        <p style="font-size:16px; margin-bottom:25px;">
          Use the following One Time Password ${otp} to verify your email address.
        </p>

        <div style="font-size:28px; font-weight:bold; letter-spacing:5px; 
                    background:#f2f2f2; padding:15px; display:inline-block; border-radius:5px;">
          {${otp}
        </div>

        <p style="font-size:14px; margin-top:25px; color:#777;">
          This OTP will expire in 10 minutes.
        </p>

        <p style="font-size:14px; margin-top:20px;">
          If you did not request this code, please ignore this email.
        </p>
      </td>
    </tr>

    <tr>
      <td style="padding:15px; text-align:center; font-size:12px; color:#aaaaaa;">
        © 2026 TaskManagerCompany. All rights reserved.
      </td>
    </tr>

  </table>

</body>`   
}

module.exports=OTPMailTemp