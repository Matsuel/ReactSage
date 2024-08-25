import { getLocalIpV4 } from './functions/getLocalIp'
import { getFileInApp } from './functions/getFileInApp'
import { replaceFileContent } from './functions/replaceFilleContent'
import { createWebSocketServer } from './functions/initWS'
import { connectToDb } from './functions/connecToDb'
import mongoose from 'mongoose'
import { UserModel } from './scheme/User'
import { generateRandomPseudo } from './functions/randomPseudo'
import bcrypt from 'bcrypt'

const IPTOUSE = getLocalIpV4()

console.log("\x1b[34mServer will run on IP:", IPTOUSE, "\x1b[0m")

const envFilePath = getFileInApp(".env.local")

replaceFileContent(envFilePath, "EXPO_PUBLIC_SERVER_IP=", IPTOUSE)

const io = createWebSocketServer({ address: IPTOUSE, port: 8080 })

io.on('connection', (socket) => {
    socket.on('test', function message(data) {
        socket.emit('test', 'kk')
        console.log('received: %s', data);
    });

    socket.on('login', async function message(data) {
        console.log('received: %s', data);
        socket.emit('login', 'kk')
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
});

connectToDb()