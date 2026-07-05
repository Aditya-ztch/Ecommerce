const users=require("../Models/UserModel");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const Login=async(req,res)=>{
    try {
        const {Email , Password}=req.body;
        const user=await users.findOne({Email:Email});
        const ComparedPassword=await bcrypt.compare(Password,user.Password);
           const token=await jwt.sign({
                userId:user._id,email:user.Email
            },process.env.secret_key,{
                expiresIn:'20min'
            })

        if(ComparedPassword){
            res.status(200).json({message:"Login Successful",token});
         
            
           
        }else{
            res.status(400).json({message:"Incorrect Password"})
        }
    } catch (error) {
        
    }
}
//fetching user details
const User=async(req,res)=>{
    try {
        const userDetails=await users.find();
        res.status(200).json({message:"User Details fetched successfully",userDetails});
    } catch (error) {
        res.status(500).json({message:"Unable to fetch Use Details",userDetails});
        
    }
}
module.exports={Login,User};