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
app.use(express.static('public'));
app.use('/images',express.static("images"))


app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use(express.static('public'))

dotenv.config()

mongoose.connect(process.env.MONGO_DB,
{useNewUrlParser:true,useUniFiedTopology:true}).
then(()=>app.listen(process.env.PORT,()=>console.log( `server is running in port  ${process.env.PORT}`))).
catch((error)=>console.log(error.message));

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname +"_"+Date.now()+path.extname(file.originalname))
    }
})

const upload =multer({
    storage:storage
})

app.post('/uplooaad',upload.single('file'),(req,res)=>{
    
    TestModel.create({image:req.file.filename})
    .then(result=>res.json(result))
    .catch(err=>console.log(err))
    
})
app.get("/getImage",(req,res)=>{
    TestModel.find()
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})


app.use("/auth",AuthRoute);
app.use("/user",UserRoute);
app.use("/post",PostRoute);
app.use("/upload",UploadRoute);