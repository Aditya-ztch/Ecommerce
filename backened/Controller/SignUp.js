const users=require("../Models/UserModel")
const bcrypt=require('bcrypt');
const SignUp=async(req,res)=>{
    try{
        const{Fname,Lname,Email,Password,Dob,Gender,Address}=req.body;
        const hashedPassword=await bcrypt.hash(Password,10);
        await users.insertOne({
            Fname:Fname,
            Lname:Lname,
            Email:Email,
            Password:hashedPassword,
            Dob:Dob,
            Gender:Gender,
            Address:Address,


        });
        res.status(200).json({
            message: "User Registered Successfully"
        })




    }catch(error){
        console.log(error);
        res.status(500).json({message:"Failed to register"});
    }
}
module.exports=SignUp;