import { Socket } from "socket.io"
import { ConversationModel } from "../scheme/conversation"

const typing = async (data: { id: string, conversationId: string, name: string }, socket: Socket, users: { [id: string]: Socket }) => {
    const { id, conversationId, name } = data
    if (!await ConversationModel.findOne({ _id: conversationId, usersId: { $in: [id] } })) return socket.emit('typing', { success: false, message: 'Conversation not found' })
    const conversation = await ConversationModel.findById(conversationId)
    if (!conversation) return socket.emit('typing', { success: false, message: 'Conversation not found' })
    const otherId = conversation.usersId.filter(userId => userId !== id)[0]
    if (Object.keys(users).includes(otherId)) {
        users[otherId].emit('typing', { name })
    } else {
        console.log('User not connected');
    }
}

export default typing