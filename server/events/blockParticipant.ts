import { Socket } from "socket.io";
import { ConversationModel } from "../scheme/conversation";
import { UserModel } from "../scheme/User";


const blockParticipant = async (data: { conversationId: string, id: string, userToLock: string }, socket: Socket) => {
    console.log('blockParticipant', data);
    const { conversationId, id, userToLock } = data
    try {
        const conversation = await ConversationModel.findOne({ _id: conversationId });
        if (conversation) {
            if (conversation.usersId.includes(id) && conversation.usersId.includes(userToLock)) {
                const requestedUser = await UserModel.findById(id);
                if (!requestedUser?.lockedId.includes(userToLock)) {
                    requestedUser?.lockedId.push(userToLock);
                    await requestedUser?.save();
                }
                socket.emit('blockParticipant', { success: true });
            }
        } else {
            socket.emit('blockParticipant', { success: false, message: 'Conversation not found' });
        }
    } catch (error) {
        console.log('blockParticipant error', error);
        socket.emit('blockParticipant', { success: false, message: 'blockParticipant failed' });
    }
}

export default blockParticipant;