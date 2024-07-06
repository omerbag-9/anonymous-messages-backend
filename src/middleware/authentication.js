import { AppError } from "../utils/AppError.js"

export const auth = (req,res,next)=>{
    const {authorization} = req.headers
    const [key,token] = authorization.split(' '[1])
    if(key !== 'bearer'){
       return next(new AppError('invalid bearer Key',401))
    }
    const payload = jwt.verify(token,'Key')
    req.user = payload
    next()
}