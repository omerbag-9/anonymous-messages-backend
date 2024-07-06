import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken'
import joi from 'joi'
import { User } from "../../../db/models/user.model.js"
import { AppError } from "../../utils/AppError.js"
import { sendEmail } from '../../utils/sendEmail.js'

const signupVal = joi.object({
    userName:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    rePassword:joi.valid(joi.ref('password')).required()
})

export const signup = async(req,res,next)=>{
    const {error} = signupVal.validate(req.body)
    if(error){
        return next(new AppError(error,401))
    }
 const {userName , email , password} = req.body
 const userExist = await User.findOne({email})
 if(userExist){
    return next(new AppError('user already exists',409))
 }
 const hashedPassword = bcrypt.hashSync(password,8)
 const user = new User({
    userName,
    email,
    password:hashedPassword
 })
 const createdUser = await user.save()
 createdUser.password = undefined
 const token = jwt.sign({email},'Key')
 sendEmail(email,token)
 return res.status(201).json({message:'user created successfully',success:true,data:createdUser})
}