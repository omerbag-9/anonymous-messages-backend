import { AppError } from "./AppError.js"

export function asyncHandler(fn) {
    return (req,res,next)=>{
        fn(req,res,next).catch((err)=>{
            next(new AppError(err.message,err.statusCode))
        })
    }
}



export const globalHandler = (err, req, res, next) => {
    res.staus(err.statusCode || 500).json({message:err.message,success:false})
}