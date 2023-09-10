import mongoose from "mongoose";

const TestSchema=new mongoose.Schema({
    myprofileimg:String,
    mycoverimg:String,
    myusername:String,
    myferstname:String,
    mylastname:String,
    myAge:Number,
    livesin:String,
    country:String,
    worksat:String,
    userId:String,
})

const TestModel=mongoose.model("test",TestSchema)
export default TestModel;