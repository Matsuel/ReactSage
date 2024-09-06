import { ConversationModel } from "../scheme/conversation"
import { UserModel } from "../scheme/User"

const searchUsers = async (data: any, socket: any) => {
    const { id, search } = data
    try {
        let users = await UserModel.find({ username: { $regex: search, $options: 'i' } }).select('username phone _id picture')
        // supprimer l'utilisateur courant de la liste
        // parmis les utilisateurs trouvés il faut supprimer les utilisateurs qui sont déjà dans les conversations de l'utilisateur courant
        const conversations = await ConversationModel.find({ usersId: { $in: [id] } }).select('usersId')
        const usersId = conversations.map(conversation => conversation.usersId).flat()
        users = users.filter(user => (user._id as string).toString() !== id && !usersId.includes((user._id as string).toString()))
        socket.emit('searchUsers', { success: true, users })
    } catch (error) {
        socket.emit('searchUsers', { success: false })
    }
}

export default searchUsers;