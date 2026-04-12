const express= require('express')
const router=express.Router()
const {login, registration, verifyOtp, userProfile}= require("../controllers/authControllers")
const { authMiddleware } = require('../middleware/authmiddleware')

router.post('/registration',registration)
router.post("/login",login)
router.post('/verify-otp',verifyOtp)
router.get("/profile", authMiddleware,userProfile)

module.exports= router
