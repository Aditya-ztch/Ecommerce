const mongoose=require('mongoose');
const userSchema=new mongoose.Schema(
    {
      Fname:{type:String,required:true},
      Lname:{type:String,required:true},
      Email:{type:String,required:true,unique:true},
      Password:{type:String,required:true},
      Dob:{type:String,required:true},
      Gender:{type:String,required:true},
      Address:{type:String}
     
    },{
        timestamps:true,
    }
)
module.exports=mongoose.model("users",userSchema);