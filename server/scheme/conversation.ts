import mongoose from "mongoose";
import { ConversationInterface } from "../type";

export const Conversation = new mongoose.Schema<ConversationInterface>({
    createdAt: { type: Date, default: Date.now, required: true },
    isGroup: { type: Boolean, default: false, required: true },
    name: { type: String, required: false },
    usersId: { type: [String], required: true },
    pinnedBy: { type: [String], required: false },
    lastMessage: { type: String, required: false },
    lastMessageDate: { type: Date, required: false },
    lastMessageAuthorId: { type: String, required: false },
    lastMessageId: { type: String, required: false },
    picture: { type: String, required: false }
}, { collection: 'conversations' })

export const ConversationModel = mongoose.model<ConversationInterface>('Conversation', Conversation)