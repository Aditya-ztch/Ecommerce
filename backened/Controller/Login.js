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
                expiresIn:'10min'
            })

        if(ComparedPassword){
            res.status(200).json({message:"Login Successful",token});
         
            
           
        }else{
            res.status(400).json({message:"Incorrect Password"})
        }
    } catch (error) {
        
    }
}
module.exports=Login;