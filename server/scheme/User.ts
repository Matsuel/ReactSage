import mongoose from "mongoose";

export const User = new mongoose.Schema({
    phoneNumber: String,
    name: String,
})

export const UserModel = mongoose.model('User', User)