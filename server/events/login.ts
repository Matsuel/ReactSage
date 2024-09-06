import { Socket } from "socket.io";
import { UserModel } from "../scheme/User";

const login = async (data: { phone: string }, socket: Socket) => {
    const { phone } = data
    try {
        const user = await UserModel.findOne({ phone })
        if (user) {
            socket.emit('login', { success: true, id: user._id, username: user.username, phone: user.phone, pin: user.pin })
        } else {
            socket.emit('login', { success: false, message: 'User not found' });
        }
    } catch (error) {
        socket.emit('login', { success: false, message: 'Login failed' });
    }
}

export default login