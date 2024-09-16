import { Socket } from "socket.io"
import { ConversationModel } from "../scheme/conversation"
import { UserModel } from "../scheme/User"


const conversationInfos = async (data: { conversationId: string, id: string }, socket: Socket) => {
    const { conversationId, id } = data

    try {
        if (!await ConversationModel.findOne({ _id: conversationId, usersId: { $in: [id] } })) return socket.emit('conversationInfos', { success: false, message: 'Conversation not found' })
        const conversation = await ConversationModel.findOne({ _id: conversationId })
        if (!conversation) return socket.emit('conversationInfos', { success: false, message: 'Conversation not found' })
        const createdAt = conversation.createdAt
        let usersInfos: any[] = []
        for (let userId of conversation.usersId) {
            const user = await UserModel.findOne({ _id: userId })
            if (!user) return socket.emit('conversationInfos', { success: false, message: 'User not found' })
            usersInfos.push({ id: user._id, username: user.username, picture: user.picture })
        }

        // plus tard les pièces jointes

        socket.emit('conversationInfos', { success: true, conversationInfos: { usersInfos, createdAt } })
    } catch (error) {
        console.log(error);
        socket.emit('conversationInfos', { success: false })
    }
}

export default conversationInfos