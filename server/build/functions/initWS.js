"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebSocketServer = void 0;
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const createWebSocketServer = ({ address, port }) => {
    try {
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        const server = (0, http_1.createServer)(app);
        const io = new socket_io_1.Server(server, {
            cors: {
                origin: `http://${address}:${port}`,
                methods: ["GET", "POST"],
                credentials: true
            },
            maxHttpBufferSize: 1e9
        });
        server.listen(port, () => {
            console.log(`Server is running on port ${port} 👂`);
        });
        return io;
    }
    catch (error) {
        console.log(error);
    }
};
exports.createWebSocketServer = createWebSocketServer;
//# sourceMappingURL=initWS.js.map