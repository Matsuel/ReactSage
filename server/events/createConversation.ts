import { Socket } from "socket.io";
import { ConversationModel } from "../scheme/conversation";
import mongoose from "mongoose";
import { Message } from "../scheme/message";
import { UserModel } from "../scheme/User";

const createConversation = async (data: { id: string, otherId: string }, socket: Socket) => {
    const { id, otherId } = data
    try {
        if (await ConversationModel.findOne({ usersId: [id, otherId] })) return socket.emit('createConversation', { success: false, message: 'Conversation already exist' })
        if (await ConversationModel.findOne({ usersId: [otherId, id] })) return socket.emit('createConversation', { success: false, message: 'Conversation already exist' })
        // si l'utilisateur courant a bloqué l'autre utilisateur, il faut le débloquer
        const requestedUser = await UserModel.findById(id)
        if (requestedUser) {
            requestedUser.lockedId = requestedUser.lockedId.filter((lockedId: string) => lockedId !== otherId)
            await requestedUser.save()
        }
        // si l'autre utilisateur a bloqué l'utilisateur courant, on ne peut pas créer la conversation
        const otherUser = await UserModel.findById(otherId)
        if (otherUser && otherUser.lockedId.includes(id)) {
            return socket.emit('createConversation', { success: false, message: 'You are blocked by this user' })
        }
        const conversation = new ConversationModel({
            usersId: [id, otherId],
            isGroup: false,
            createdAt: new Date(),
            pinnedBy: [],
        })
        await conversation.save()
        let conversationCollection = mongoose.model('Conversation' + conversation._id, Message)
        conversationCollection.createCollection()
        socket.emit('createConversation', { success: true })
    } catch (error) {
        console.log(error);
        socket.emit('createConversation', { success: false })
    }
}

export default createConversation