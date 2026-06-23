const express=require('express');
const router=express.Router();
const SignUp=require("../Controller/SignUp");
const Login=require("../Controller/Login");
const products=require("../Controller/Products")


router.post("/SignUp",SignUp);
router.post("/login",Login);
router.get("/products",products)



module.exports=router;