const users=require("../Models/UserModel");
const bcrypt=require('bcrypt');
const Login=async(req,res)=>{
    try {
        const {Email , Password}=req.body;
        const user=await users.findOne({Email:Email});
        const ComparedPassword=await bcrypt.compare(Password,user.Password);
        if(ComparedPassword){
            res.status(200).json({message:"Login Successful",user});
           
        }else{
            res.status(400).json({message:"Incorrect Password"})
        }
    } catch (error) {
        
    }
}
module.exports=Login;