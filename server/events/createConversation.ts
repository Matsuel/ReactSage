import { Socket } from "socket.io";
import { ConversationModel } from "../scheme/conversation";
import mongoose from "mongoose";
import { Message } from "../scheme/message";

const createConversation = async (data: { id: string, otherId: string }, socket: Socket) => {
    const { id, otherId } = data
    try {
        if (await ConversationModel.findOne({ usersId: [id, otherId] })) return socket.emit('createConversation', { success: false, message: 'Conversation already exist' })
        if (await ConversationModel.findOne({ usersId: [otherId, id] })) return socket.emit('createConversation', { success: false, message: 'Conversation already exist' })
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