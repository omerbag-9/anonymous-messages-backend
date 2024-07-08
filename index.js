// import modules
import express from 'express'
import { connectDB } from './db/connection.js'
import { globalHandler } from './src/utils/asyncHandler.js'
import { authRouter } from './src/modules/auth/auth.router.js'
import jwt from 'jsonwebtoken'
import { User } from './db/models/user.model.js'
import { messageRouter } from './src/modules/message/message.router.js'

// create server
const app = express()
const port = 3000

// connect to db

connectDB()

// parse data

app.use(express.json())

// routers

app.use('/auth',authRouter)
app.use('/message',messageRouter)

// sendemail router

app.get('/verify/:token', async(req,res,next)=>{
    try{
        const {token} = req.params
    const payload = jwt.verify(token,'Key')
    await User.findOneAndUpdate({email:payload.email},{isValid:true})
    return res.status(200).json({message:'your email is verified successfully go to login'})
}
catch(err){
    return res.status(err.cause || 500).json({ message: err.message, success: false })
}
})

//global error handler

app.use(globalHandler)

// listent on server

app.listen(port , ()=>{
    console.log('server is running on port',port);
})
