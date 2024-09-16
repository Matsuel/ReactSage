import { Socket } from "socket.io"
import { ConversationModel } from "../scheme/conversation"
import { Message } from "../scheme/message"
import mongoose from "mongoose"


const createConversation = async (data: { id: string, conversationId: string }, socket: Socket) => {
    const { id, conversationId } = data
    try {
        if (!await ConversationModel.findOne({ _id: conversationId, usersId: { $in: [id] } })) return socket.emit('getMessages', { success: false, message: 'Conversation not found' })
        const conversation = await ConversationModel.findOne({ _id: conversationId })
        if (!conversation) return socket.emit('getMessages', { success: false, message: 'Conversation not found' })
        await ConversationModel.deleteOne({ _id: conversationId })
        // supprimer la collection des messages de la conversation
        const conversationCollection = mongoose.model('Conversation' + conversation._id, Message)
        await conversationCollection.collection.drop()
        socket.emit('deleteConversation', { success: true })
    } catch (error) {
        console.log(error)
        socket.emit('deleteConversation', { success: false })
    }
}

export default createConversation