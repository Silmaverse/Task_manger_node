const express= require('express')
const router=express.Router()
const {login, registration, verifyOtp}= require("../controllers/authControllers")

router.post('/registration',registration)
router.post("/login",login)
router.post('/verify-otp',verifyOtp)

module.exports= router
