import mongoose from "mongoose";

interface UserOptions {
    showOnline: boolean;
}

export interface UserInterface extends mongoose.Document {
    picture: string;
    phone: string;
    username: string;
    pin: string;
    options: UserOptions;
    joinedAt: Date;
    color: string;
    lockedId: string[];
}

export interface UserInterfaceComponent {
    picture: string;
    phone: string;
    username: string;
    _id: string;
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
    picture: string;
}

export interface ConversationInterfaceComponent {
    createdAt: Date;
    isGroup: boolean;
    name: string;
    usersId: string[];
    pinnedBy: string[];
    lastMessage: string;
    lastMessageDate: Date;
    lastMessageAuthorId: string;
    lastMessageId: string;
    _id: string;
    picture: string;
}

export interface MessageInterface extends mongoose.Document {
    content: string;
    authorId: string;
    date: Date;
    viewedBy: string[];
}

export interface MessageInterfaceComponent {
    content: string;
    authorId: string;
    date: Date;
    viewedBy: string[];
    _id: string;
}