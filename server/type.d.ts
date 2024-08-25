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