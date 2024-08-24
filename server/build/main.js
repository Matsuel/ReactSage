"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getLocalIp_1 = require("./functions/getLocalIp");
const getFileInApp_1 = require("./functions/getFileInApp");
const replaceFilleContent_1 = require("./functions/replaceFilleContent");
const initWS_1 = require("./functions/initWS");
const connecToDb_1 = require("./functions/connecToDb");
const IPTOUSE = (0, getLocalIp_1.getLocalIpV4)();
console.log("\x1b[34mServer will run on IP:", IPTOUSE, "\x1b[0m");
const envFilePath = (0, getFileInApp_1.getFileInApp)(".env.local");
(0, replaceFilleContent_1.replaceFileContent)(envFilePath, "EXPO_PUBLIC_SERVER_IP=", IPTOUSE);
const io = (0, initWS_1.createWebSocketServer)({ address: IPTOUSE, port: 8080 });
io.on('connection', (socket) => {
    socket.on('test', function message(data) {
        socket.emit('test', 'kk');
        console.log('received: %s', data);
    });
    socket.on('kk', function message(data) {
        console.log('kk: %s', data);
    });
    socket.send('something');
});
(0, connecToDb_1.connectToDb)();
//# sourceMappingURL=main.js.map