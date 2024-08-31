import mongoose from "mongoose";
import { ConversationInterface } from "../type";

export const Conversation = new mongoose.Schema<ConversationInterface>({
    createdAt: { type: Date, default: Date.now, required: true },
    isGroup: { type: Boolean, default: false, required: true },
    name: { type: String, required: false, default: '' },
    usersId: { type: [String], required: true },
    pinnedBy: { type: [String], required: false, default: [] },
    lastMessage: { type: String, required: false, default: '' },
    lastMessageDate: { type: Date, required: false, default: null },
    lastMessageAuthorId: { type: String, required: false, default: '' },
    lastMessageId: { type: String, required: false, default: '' },
    picture: { type: String, required: false, default: '' },
}, { collection: 'conversations' })

export const ConversationModel = mongoose.model<ConversationInterface>('Conversation', Conversation)