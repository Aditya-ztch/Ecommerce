const express=require('express');
const router=express.Router();
const SignUp=require("../Controller/SignUp");
const {Login,User}=require("../Controller/Login");
const verifiedUser=require("../middleware/authUser")



router.post("/SignUp",SignUp);
router.post("/login",Login);
router.get("/fetch-users",verifiedUser,User)




module.exports=router;