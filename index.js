import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRouste.js";
import cors from "cors";
import UploadRoute from "./Routes/UploadRoute.js";
import multer from "multer";
import path from "path";
import TestModel from "./Models/testModel.js";

const app=express();

//to serve image from public



app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use(express.static('public'))

dotenv.config()

mongoose.connect(process.env.MONGO_DB,
{useNewUrlParser:true,useUniFiedTopology:true}).
then(()=>app.listen(process.env.PORT,()=>console.log( `server is running in port  ${process.env.PORT}`))).
catch((error)=>console.log(error.message));



app.post('/uplooaad',(req,res)=>{
    const test =new TestModel({
        _id:new mongoose.Types.ObjectId(),
        mycoverimag:req.body.mycoverimag,
      
        myusername:req.body.myusername,
        mylastname:req.body.mylastname,
        myprofileimg:req.body.myprofileimg,
        myAge:req.body.myAge,
        livesin:req.body.livesin,
        country:req.body.country,
        worksat:req.body.worksat,
       
    })
    console.log(test);
    test.save();
  res.send("image ipload")
})
app.get("/getImage", async(req,res)=>{
    try {
        const result = await TestModel.find();
        res.status(200).json(result);
        
    } catch (error) {
        res.status(400).json(error)
    }
   

   
})

app.put("/updatetest/:id",async(req,res)=>{
    const postId=req.params.id
    try {
        const post=await TestModel.findById(postId)
        await post.updateOne({$set:req.body})
        res.status(201).json("it don")
        console.log(post)
    } catch (error) {
        res.status(404).json("you cant apdatet")
    }
})


app.use("/auth",AuthRoute);
app.use("/user",UserRoute);
app.use("/post",PostRoute);
app.use("/upload",UploadRoute);