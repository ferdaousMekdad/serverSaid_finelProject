import mongoose from "mongoose";

const recipeSchema=mongoose.Schema({
    username:{
        type:String,
        
    },
    userimage:{
        type:String,
      
    },
    name:{
        type:String,
        required:true,
    },

    ingredients:[
        {
            type:String,
            required:true,
        },
    ],
    description:{
        type:String,
        required:true,
    },

    imageUrl:{
        type:String,
        required:true,
    },
    cookingTime:{
        type:Number,
        required:true,
    },
    userOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
       
    },
    Likes:[],
    
});

export const RecipesModel =mongoose.model("Recipes",recipeSchema);