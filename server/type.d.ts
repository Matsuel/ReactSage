import mongoose from "mongoose";

interface UserOptions {
    showOnline: boolean;
}

export interface UserInterface extends mongoose.Document {
    phone: string;
    username: string;
    pin: string;
    options: UserOptions;
    joinedAt: Date;
}

export interface ConversationInterface extends mongoose.Document {
    createdAt: Date;
    isGroup: boolean;
    name: string;
    usersId: string[];
    pinnedBy: string[];
    lastMessage: string;
    lastMessageDate: Date;
    lastMessageAuthorId: string;
    lastMessageId: string;
}

export interface MessageInterface extends mongoose.Document {
    content: string;
    authorId: string;
    date: Date;
    viewedBy: string[];
}