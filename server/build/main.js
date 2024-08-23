"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getLocalIp_1 = require("./functions/getLocalIp");
const getFileInApp_1 = require("./functions/getFileInApp");
const replaceFilleContent_1 = require("./functions/replaceFilleContent");
const initWS_1 = require("./functions/initWS");
const connecToDb_1 = require("./functions/connecToDb");
const User_1 = require("./scheme/User");
const IPTOUSE = (0, getLocalIp_1.getLocalIpV4)();
console.log("\x1b[34mServer will run on IP:", IPTOUSE, "\x1b[0m");
const envFilePath = (0, getFileInApp_1.getFileInApp)(".env.local");
(0, replaceFilleContent_1.replaceFileContent)(envFilePath, "SERVER_IP=", IPTOUSE);
const wss = (0, initWS_1.createWebSocketServer)({ address: IPTOUSE, port: 8080 });
wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });
    ws.send('something');
});
(0, connecToDb_1.connectToDb)();
const testUser = new User_1.UserModel({
    phoneNumber: "123456789",
    name: "Test User"
});
testUser.save().then(() => {
    console.log("User saved");
});
//# sourceMappingURL=main.js.map