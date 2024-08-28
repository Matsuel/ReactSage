import mongoose from "mongoose";
import { MessageInterface } from "../type";

export const Message = new mongoose.Schema<MessageInterface>({
    authorId: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
    viewedBy: { type: [String], required: false }
})