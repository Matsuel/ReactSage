import { getLocalIpV4 } from './functions/getLocalIp'
import { getFileInApp } from './functions/getFileInApp'
import { replaceFileContent } from './functions/replaceFilleContent'
import { createWebSocketServer } from './functions/initWS'
import { connectToDb } from './functions/connecToDb'
import mongoose from 'mongoose'
import { UserModel } from './scheme/User'

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

    socket.on('kk', function message(data) {
        console.log('kk: %s', data);
    })

    socket.send('something');
});

connectToDb()