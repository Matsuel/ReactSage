import mongoose from "mongoose";
import { UserInterface } from "../type";

export const User = new mongoose.Schema<UserInterface>({
    phone: { type: String, unique: true },
    username: { type: String, unique: true },
    pin: { type: String },
    joinedAt: { type: Date, default: Date.now },
    options: {
        showOnline: { type: Boolean, default: true },
    }
})

export const UserModel = mongoose.model<UserInterface>('User', User)