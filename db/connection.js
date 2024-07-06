import mongoose from "mongoose";

export const connectDB = ()=>{
    mongoose.connect('mongodb://localhost:27017/saraha').then(()=>{
        console.log('db connected successfully');
    }).catch((err)=>{
        console.log('error connecting to db');
    })
}