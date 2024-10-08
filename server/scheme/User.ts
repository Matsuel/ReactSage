import mongoose from "mongoose";
import { UserInterface } from "../type";

export const User = new mongoose.Schema<UserInterface>({
    picture: { type: String, required: false },
    phone: { type: String, unique: true },
    username: { type: String, unique: true },
    pin: { type: String },
    joinedAt: { type: Date, default: Date.now },
    options: {
        showOnline: { type: Boolean, default: true },
    },
    color: { type: String, default: '#000' },
    lockedId: { type: [String], default: [] },
}, { collection: 'users' })

export const UserModel = mongoose.model<UserInterface>('User', User)