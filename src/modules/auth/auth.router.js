import { Router } from "express";
import { signup } from "./auth.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const authRouter = Router()

// add user
authRouter.post('/signup',asyncHandler(signup))