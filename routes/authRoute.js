const express= require('express')
const router=express.Router()
const upload =require("../helpers/multerService")
const {login, registration, verifyOtp, userProfile, updateProfile}= require("../controllers/authControllers")
const { authMiddleware } = require('../middleware/authmiddleware')

router.post('/registration',registration)
router.post("/login",login)
router.post('/verify-otp',verifyOtp)
router.get("/profile", authMiddleware,userProfile)
router.put("/updateProfile",authMiddleware, upload.single('avatar'),updateProfile)

module.exports= router
