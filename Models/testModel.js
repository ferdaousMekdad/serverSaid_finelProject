import mongoose from "mongoose";

const TestSchema=new mongoose.Schema({
    image:String
})

const TestModel=mongoose.model("test",TestSchema)
export default TestModel;