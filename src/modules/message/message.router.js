import { Router } from "express";
import { addMessage, deleteMessage, getMessages } from "./message.controller.js";
import { auth } from "../../middleware/authentication.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const messageRouter = Router()

// add message
messageRouter.post('/',asyncHandler(addMessage))

messageRouter.use(auth)
// get messages
messageRouter.get('/',asyncHandler(getMessages))
// delete message
messageRouter.delete('/:messageId',asyncHandler(deleteMessage))