
import mongoose from "mongoose";
import PostModel from "../Models/PostModel.js";
import { RecipesModel } from "../Models/RecipeModel.js";


//creat a Recipe

export const CreateRecipe=async(req,res)=>{
const recipe =new RecipesModel({
    _id:new mongoose.Types.ObjectId(),
    username:req.body.username,
    userimage:req.body.userimage,
    name:req.body.name,
    image:req.body.image,
    ingredients:req.body.ingredients,
    description:req.body.description,
    imageUrl:req.body.imageUrl,
    cookingTime:req.body.cookingTime,
    Likes:req.body.likes,

  
});
console.log(recipe);

try {
    const result =await recipe.save();
    res.status(201).json({ result
    })
} catch (error) {
    res.status(500).json(error)
}

}


//get RecipeModel

export const GetRecipe=async(req,res)=>{
   

    try {
        const result=await RecipesModel.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error)
    }
};

//creat a now Post 
export const CreatePost = async(req,res)=>{
    const newPost = new PostModel(req.body);
    try {
        await newPost.save();
        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json("her is the err in creat post")
    }
}

//get a post


export const getPost=async(req,res)=>{
    const id=req.params.id

    try {
        const post = await PostModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
     
}


//Update a Post 

export const updatePost=async(req,res)=>{
    const postId =req.params.id
    const {userId}=req.body

    try {
        const post =await PostModel.findById(postId)
        if(post.userId === userId)
        {
            await post.updateOne({$set : req.body})
            res.status(200).json("Post Update")
        }else{
            res.status(403).json("you cant update this post")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//delete post

export const deletePost=async(req,res)=>{
    const id=req.params.id
    const {userId}=req.body

    try {
        const post =await PostModel.findById(id)
        if(post.userId===userId){
            await post.deleteOne();
            res.status(200).json("post deleted")
        }else{
            res.status(400).json("you cant delete this post")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//likes /dislike

export const likePost =async(req,res)=>{
    const id =req.params.id
    const {user}=req.body

    try {
        const post = await RecipesModel.findById(id)
        if(!post.Likes.includes(user))
        {
            await post.updateOne({$push:{Likes:user}})
            res.status(200).json("post liked")
            console.log("likeerr")
        }else{
            await post.updateOne({$pull:{Likes:user}})
            res.status(200).json("post unliked")
            console.log("liketoerr")
        }
    } catch(error){
        res.status(500).json("likes err")
    }
};

