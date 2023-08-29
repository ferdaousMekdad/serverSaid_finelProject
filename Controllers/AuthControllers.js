import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Register

export const registerUser=async(req,res)=>{
   const {username,password,firstname,lastname}=req.body;

   const salt =await bcrypt.genSalt(10)
   const hashedPass = await bcrypt.hash(password,salt)

   const newUser =new UserModel({username,password: hashedPass,firstname,lastname})
   try {
     const oldUser = await UserModel.findOne({username})
     if(oldUser){
      return res.status(400).json({message:"user already exist"})
     }
     const user= await newUser.save();
     const token=jwt.sign({
      username:user.username,id:user._id
     },"MERN",{expiresIn:'3h'})
     res.status(200).json({user,token})
   } catch (error) {
    res.status(400).json({message:error.message})
    
   }

}

//Login user

export const LoginUser =async(req,res)=>{
  const {username,password}=req.body

  try {
    const user= await UserModel.findOne({username:username})
    
    if(user){
      const validity =await bcrypt.compare(password,user.password)
       
      if(!validity){
       res.status(400).json("wrong password")
      }else{
        const token =jwt.sign({
          username:user.username,id:user._id},
          "MERN",{expiresIn:'3h'})
          res.status(200).json({user,token})
      }
    
    }else{
      res.status(400).json("user dose not exists")
    }
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}