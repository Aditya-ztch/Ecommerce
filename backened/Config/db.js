const mongoose=require('mongoose')
const DBConnections=async()=>{
    try{
        await mongoose.connect(process.env.MongoDB_URL);
        console.log('DB connected Successfully');
    }catch(error){
        console.log('Failed to connect DB:',error)
    }
};
module.exports=DBConnections;