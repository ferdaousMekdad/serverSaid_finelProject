import express from "express";
import multer from "multer";
import PostModel from "../Models/PostModel.js";

const router =express.Router();

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    },

});

const upload =multer({storage:storage});

router.post("/",upload.single("file",(req,res)=>{
   
    try {
        return res.status(200).json("file apload succsesfully")
    } catch (error) {
        console.log(error)
    }
}))

export default router;
