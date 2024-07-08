import { model, Schema } from "mongoose";
// schema
const messageSchema = new Schema({
    content:{
        type:String,
        required:true
    },
    recieverId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})
// model
export const Message = model('Message',messageSchema)