const express=require('express');
const router=express.Router();
const SignUp=require("../Controller/SignUp");
const Login=require("../Controller/Login");



router.post("/SignUp",SignUp);
router.post("/login",Login);




module.exports=router;