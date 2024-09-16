import { Socket } from "socket.io"
import { UserModel } from "../scheme/User"
import { ConversationModel } from "../scheme/conversation"
import { Message } from "../scheme/message"
import mongoose from "mongoose"


const createConversation = async (data: { id: string }, socket: Socket) => {
    const { id } = data
    try {
        await UserModel.deleteOne({ _id: id })
        // recuperer tous les id des conversations de l'utilisateur
        const conversations = await ConversationModel.find({ usersId: { $in: [id] } })
        // suppression toutes les conversations
        await ConversationModel.deleteMany({ usersId: { $in: [id] } })
        // pour chaque conversation supprimer la collection des messages conversation+id
        for (let conversation of conversations) {
            const conversationCollection = mongoose.model('Conversation' + conversation._id, Message)
            await conversationCollection.collection.drop()
        }
        socket.emit('deleteAccount', { success: true })
    } catch (error) {
        console.log(error);
        socket.emit('deleteAccount', { success: false })
    }
}

export default createConversation