import { Socket } from "socket.io";

const welcome = async (data: any, socket: Socket, users: { [key: string]: any }) => {
    const { id } = data
    users[id] = socket
    console.log('welcome');
    socket.emit('welcome', { success: true })
}

export default welcome;