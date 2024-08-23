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

replaceFileContent(envFilePath, "SERVER_IP=", IPTOUSE)

const wss = createWebSocketServer({ address: IPTOUSE, port: 8080 })

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });

    ws.send('something');
});

connectToDb()

const testUser = new UserModel({
    phoneNumber: "123456789",
    name: "Test User"
})

testUser.save().then(() => {
    console.log("User saved")
})