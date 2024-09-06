import mongoose from "mongoose";
import { ConversationModel } from "../scheme/conversation";
import { Message } from "../scheme/message";

const sendMessage = async (data: { id: string, conversationId: string, message: string }, socket: any, users: { [key: string]: any }) => {
    console.log(data);
    const { id, conversationId, message } = data
    try {
        if (!await ConversationModel.findOne({ _id: conversationId, usersId: { $in: [id] } })) return socket.emit('sendMessage', { success: false, message: 'Conversation not found' })
        let conversationCollection = mongoose.model('Conversation' + conversationId, Message)
        const newMessage = new conversationCollection({
            authorId: id,
            content: message,
            date: new Date(),
            viewedBy: [],
        })
        await newMessage.save()
        const conversation = await ConversationModel.findById(conversationId)
        if (conversation) {
            conversation.lastMessage = message;
            conversation.lastMessageDate = new Date()
            conversation.lastMessageAuthorId = id
            conversation.lastMessageId = newMessage._id as string
            await conversation.save()
            const otherId = conversation.usersId.filter(userId => userId !== id)[0]
            if (users[otherId]) {
                users[otherId].emit('newMessage', { conversationId })
            } else {
                console.log('user not found');
            }
        }
        socket.emit('sendMessage', { success: true })
    } catch (error) {
        console.log(error);
        socket.emit('sendMessage', { success: false })
    }
}

export default sendMessage;