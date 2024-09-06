import { Socket } from "socket.io";
import { ConversationModel } from "../scheme/conversation";
import mongoose from "mongoose";
import { Message } from "../scheme/message";

const updateViewed = async (data: { id: string, conversationId: string }, socket: Socket) => {
    const { id, conversationId } = data
    if (!await ConversationModel.findOne({ _id: conversationId, usersId: { $in: [id] } })) return socket.emit('updateViewed', { success: false, message: 'Conversation not found' })
    const conversation = await ConversationModel.findById(conversationId)
    if (!conversation) return socket.emit('updateViewed', { success: false, message: 'Conversation not found' })
    const lastMessageId = conversation.lastMessageId
    let conversationCollection = mongoose.model('Conversation' + conversationId, Message)
    // supprimer de tous les messages du chat l'utilisateur courant de viewedBy
    await conversationCollection.updateMany({ viewedBy: { $in: [id] } }, { $pull: { viewedBy: id } })
    await conversationCollection.updateMany({ _id: { $eq: lastMessageId } }, { $push: { viewedBy: id } })
}

export default updateViewed