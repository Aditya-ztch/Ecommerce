const express= require('express');
app=express();
const env=require('dotenv');
DBConnection=require('./Config/db');
env.config();
const cors=require('cors');
app.use(cors());
app.use(express.json());

DBConnection(); //Db connection
const UserRouter=require("./Routes/UserRouter")
app.use("/api",UserRouter);

app.listen(process.env.PORT,()=>{
    console.log(`backened is listen at port:`,process.env.PORT)
})