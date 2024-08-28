import { getLocalIpV4 } from './functions/getLocalIp'
import { getFileInApp } from './functions/getFileInApp'
import { replaceFileContent } from './functions/replaceFilleContent'
import { createWebSocketServer } from './functions/initWS'
import { connectToDb } from './functions/connecToDb'
import { UserModel } from './scheme/User'
import { generateRandomPseudo } from './functions/randomPseudo'
import bcrypt from 'bcrypt'
import { Conversation, ConversationModel } from './scheme/conversation'

const IPTOUSE = getLocalIpV4()

console.log("\x1b[34mServer will run on IP:", IPTOUSE, "\x1b[0m")

const envFilePath = getFileInApp(".env.local")

replaceFileContent(envFilePath, "EXPO_PUBLIC_SERVER_IP=", IPTOUSE)

const io = createWebSocketServer({ address: IPTOUSE, port: 8080 })

io.on('connection', async (socket) => {

    socket.on('checkPin', async function message(data) {
        console.log(data);

        const { phone, pin } = data
        try {
            const user = await UserModel.findOne({ phone })
            if (user) {
                const match = bcrypt.compareSync(pin, user.pin);
                if (match) {
                    socket.emit('checkPin', { success: true, id: user._id, username: user.username });
                } else {
                    socket.emit('checkPin', { success: false, message: 'Pin not match' });
                }
            } else {
                socket.emit('checkPin', { success: false, message: 'User not found' });
            }
        } catch (error) {
            socket.emit('checkPin', { success: false, message: 'Login failed' });
        }
    });

    socket.on('login', async function message(data) {
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
    });

    socket.on('register', async function message(data) {
        console.log('received: %s', data);

        try {
            const user = new UserModel({
                phone: data.phone,
                username: generateRandomPseudo(),
                pin: bcrypt.hashSync(data.pin, 10),
            })

            await user.save()
            socket.emit('register', { success: true, id: user._id, username: user.username })

        } catch (error) {
            socket.emit('register', { success: false })
        }
    });

    socket.on('searchUsers', async function message(data) {
        console.log('received: %s', data);
        const { id, search } = data
        try {
            let users = await UserModel.find({ username: { $regex: search, $options: 'i' } }).select('username phone _id picture')
            users = users.filter(user => user._id.toString() !== id)
            socket.emit('searchUsers', { success: true, users })
        } catch (error) {
            socket.emit('searchUsers', { success: false })
        }
    });
});

connectToDb()

