const express= require('express')
const router=express.Router()
const authRoute=require("./authRoute")
const projectRoute=require("./projectRoute");
const { authMiddleware } = require('../middleware/authmiddleware');

router.get("/", (req,res)=>{
    res.send("Hi from node js")
});

router.use('/auth' ,authRoute);
router.use('/projectroute',authMiddleware  ,projectRoute);

module.exports=router;

