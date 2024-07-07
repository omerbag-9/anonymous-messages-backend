import { Router } from "express";
import { signIn, signup } from "./auth.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const authRouter = Router()

// signup
authRouter.post('/signup',asyncHandler(signup))
// signin
authRouter.post('/sign-in',asyncHandler(signIn))