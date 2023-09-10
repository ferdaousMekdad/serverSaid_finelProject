import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"



//get for post user info

export const GetUserInfo=async(req,res)=>{
    const id=req.params.id; 
    
    try {
        const result=await UserModel.findById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error)
    }
}



//create post user 


export const AddUserinfo=async(req,res)=>{
   
        const user =new UserModel({
            
           
            profilePicture:req.body.profilePicture,
            firstname:req.body.firstname,
           
            coverPicture:req.body.coverPicture,
            lastname:req.body.lastname,
            livesin:req.body.livesin,
            country:req.body.country,
            Age:req.body.Age,
          
        });
        console.log(user);
        
        try {
            
            const result =await user.save();
            res.status(201).json({ result
            })
        } catch (error) {
            res.status(500).json(error)
        }

    }
    
   



//get a user 


export const GetUser =async(req,res)=>{
     const id=req.params.id; 

     try {
        const user = await UserModel.findById(id);

        if(user){
            const {password,  ...otherDetails}=user._doc
           res.status(200).json(otherDetails)
        }else{
            res.status(404).json("No such user exists")
        }
        
     } catch (error) {
        res.status(500).json(error)
     }


}; 


//update a user 

export const updateUser =async(req,res)=>{
    const id =req.params.id;
    const n =new UserModel({
       
        username:req.body.username,
        Age:req.body.Age,
        });
        console.log(n)
    try {
        const user =await UserModel.findById(id)
    const newuser= await user.updateOne({$set:
        { username:req.body.username,
            profilePicture:req.body.profilePicture,
            firstname:req.body.firstname,
        
            coverPicture:req.body.coverPicture,
            lastname:req.body.lastname,
            livesin:req.body.livesin,
            country:req.body.country,
            Age:req.body.Age,
            worksAt:req.body.worksAt,
        },new:true})
        
        
        {/**
        const {_id,password}=req.body;
        if(id===_id){
            if(password)
            {
                const salt = await bcrypt.genSalt(10);
                req.body.password =await bcrypt.hash(password,salt);
            }
           
           const token=jwt.sign( 
            {username:user.username,id:user._id},
            process.env.JWT_KEY,
            {expiresIn:"3h"}
           )
        
        } else{
            res.status(403).json("you can only update your own profile")
        } 
        */}
          
              res.status(200).json(newuser.Age)
              console.log(newuser)
        } catch (error) {
            res.status(500).json(error)
        } 

}

//delete user 

export const deleteUser =async(req,res)=>{
    const id=req.params.id

    const {currentUserId,currentUseAdminStatuse}=req.body

    if(currentUserId ||currentUseAdminStatuse ){
        try {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json("User deleted successfully")
        } catch (error) {
            res.status(500).json(error)
        }

    }else{
        res.status(403).json("you can only delete your own profile")
    }

}

 