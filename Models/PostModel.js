import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    userId: {type:String,
               required:true },

    userImg:{type:String,
                 },

    image:String,

    username:{type:String,
        },

    recipeName: {type:String,
         },

    ingridient: {type:String},

    desc: {type:String, },

     cookingTime: {type:Number},

    Likes:[],
},
{timestamps:true}

);

const PostModel=mongoose.model("Post",PostSchema);

export default PostModel;