import mongoose from "mongoose"
import { ConversationModel } from "../scheme/conversation"
import { Message } from "../scheme/message"

const getMessages = async (data: any, socket: any) => {
    const { id, conversationId } = data

    try {
        if (!await ConversationModel.findOne({ _id: conversationId, usersId: { $in: [id] } })) return socket.emit('getMessages', { success: false, message: 'Conversation not found' })
        let conversationCollection = mongoose.model('Conversation' + conversationId, Message)
        let messages = await conversationCollection.find().sort({ createdAt: 1 })
        socket.emit('getMessages', { success: true, messages })
    } catch (error) {
        console.log(error);
        socket.emit('getMessages', { success: false })
    }
}

export default getMessages;