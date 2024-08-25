"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getLocalIp_1 = require("./functions/getLocalIp");
const getFileInApp_1 = require("./functions/getFileInApp");
const replaceFilleContent_1 = require("./functions/replaceFilleContent");
const initWS_1 = require("./functions/initWS");
const connecToDb_1 = require("./functions/connecToDb");
const User_1 = require("./scheme/User");
const randomPseudo_1 = require("./functions/randomPseudo");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
    socket.on('login', function message(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('received: %s', data);
            socket.emit('login', 'kk');
        });
    });
    socket.on('register', function message(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('received: %s', data);
            try {
                const user = new User_1.UserModel({
                    phone: data.phone,
                    username: (0, randomPseudo_1.generateRandomPseudo)(),
                    pin: bcrypt_1.default.hashSync(data.pin, 10),
                });
                yield user.save();
                socket.emit('register', { success: true, id: user._id, username: user.username });
            }
            catch (error) {
                socket.emit('register', { success: false });
            }
        });
    });
});
(0, connecToDb_1.connectToDb)();
//# sourceMappingURL=main.js.map