import { Socket } from "socket.io"
import { UserModel } from "../scheme/User"
import { generateRandomPseudo } from "../functions/randomPseudo"
import bcrypt from 'bcrypt'

const register = async (data: { phone: string, pin: string }, socket: Socket) => {
    const { phone, pin } = data
    try {
        const user = new UserModel({
            phone: phone,
            username: generateRandomPseudo(),
            pin: bcrypt.hashSync(pin, 10),
        })

        await user.save()
        socket.emit('register', { success: true, id: user._id, username: user.username })

    } catch (error) {
        socket.emit('register', { success: false })
    }
}

export default register