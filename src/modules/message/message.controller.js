import { Message } from "../../../db/models/message.model.js"
import { User } from "../../../db/models/user.model.js"
import { AppError } from "../../utils/AppError.js"

export const addMessage = async (req,res,next)=>{
    const {content , recieverId} = req.body
    const userExist = await User.findById({_id:recieverId})
    if(!userExist){
        return next(new AppError('user is not exist',404))
    }
    const message = new Message({
        content,
        recieverId
    })
    const createdMessage = await message.save()
    return res.status(201).json({message:'message added successfully',success:true,data:createdMessage})
}

export const getMessages = async (req,res,next)=>{
    const {userId} = req.user 
    const getUserMessage = await Message.find({recieverId:userId})
    return res.status(201).json({data:getUserMessage,success:true})
}

export const deleteMessage = async (req,res,next)=>{
    const {userId} = req.user
    const {messageId} = req.params
    const messageExist = await Message.findById(messageId)
    if(!messageExist){
        return next(new AppError('message is not exist',404))
    } 
    const userAuthorized = await Message.findOne({recieverId:userId})
    if(!userAuthorized){
        return next(new AppError("you don't have the right to delete this message",401))
    }
    await Message.deleteOne({_id:messageId})
    return res.status(201).json({message:'message deleted successfully',success:true})
}