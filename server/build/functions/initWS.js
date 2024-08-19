"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebSocketServer = void 0;
const ws_1 = require("ws");
const createWebSocketServer = ({ address, port }) => {
    const wss = new ws_1.Server({ host: address, port: port });
    console.log(`\x1b[34mServer start on address ${address} and port ${port}\x1b[0m`);
    return wss;
};
exports.createWebSocketServer = createWebSocketServer;
//# sourceMappingURL=initWS.js.map