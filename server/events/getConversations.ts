import { Socket } from "socket.io";
import { ConversationModel } from "../scheme/conversation";
import { UserModel } from "../scheme/User";

const getConversations = async (data: { id: string }, socket: Socket) => {
    const { id } = data
    try {
        let conversations = await ConversationModel.find({ usersId: { $in: [id] } }).select('name usersId pinnedBy lastMessage lastMessageDate lastMessageAuthorId lastMessageId isGroup createdAt')
        // recuperer pour chaucne des conversations l'autre utilisateur, récup sa photo et son pseudo
        for (let i = 0; i < conversations.length; i++) {
            const conversation = conversations[i]
            const userId = conversation.usersId.filter(userId => userId !== id)[0]
            const user = await UserModel.findById(userId).select('username picture')
            if (!user) {
                continue
            }
            conversations[i] = { ...conversation.toObject(), name: user.username, picture: user.picture, _id: conversation._id } as any
        }
        socket.emit('getConversations', { success: true, conversations })
    } catch (error) {
        console.log(error);

        socket.emit('getConversations', { success: false })
    }
}

export default getConversations