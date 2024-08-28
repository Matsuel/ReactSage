"use strict";
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
const conversation_1 = require("./scheme/conversation");
const IPTOUSE = (0, getLocalIp_1.getLocalIpV4)();
console.log("\x1b[34mServer will run on IP:", IPTOUSE, "\x1b[0m");
const envFilePath = (0, getFileInApp_1.getFileInApp)(".env.local");
(0, replaceFilleContent_1.replaceFileContent)(envFilePath, "EXPO_PUBLIC_SERVER_IP=", IPTOUSE);
const io = (0, initWS_1.createWebSocketServer)({ address: IPTOUSE, port: 8080 });
io.on('connection', async (socket) => {
    socket.on('checkPin', async function message(data) {
        console.log(data);
        const { phone, pin } = data;
        try {
            const user = await User_1.UserModel.findOne({ phone });
            if (user) {
                const match = bcrypt_1.default.compareSync(pin, user.pin);
                if (match) {
                    socket.emit('checkPin', { success: true, id: user._id, username: user.username });
                }
                else {
                    socket.emit('checkPin', { success: false, message: 'Pin not match' });
                }
            }
            else {
                socket.emit('checkPin', { success: false, message: 'User not found' });
            }
        }
        catch (error) {
            socket.emit('checkPin', { success: false, message: 'Login failed' });
        }
    });
    socket.on('login', async function message(data) {
        const { phone } = data;
        try {
            const user = await User_1.UserModel.findOne({ phone });
            if (user) {
                socket.emit('login', { success: true, id: user._id, username: user.username, phone: user.phone, pin: user.pin });
            }
            else {
                socket.emit('login', { success: false, message: 'User not found' });
            }
        }
        catch (error) {
            socket.emit('login', { success: false, message: 'Login failed' });
        }
    });
    socket.on('register', async function message(data) {
        console.log('received: %s', data);
        try {
            const user = new User_1.UserModel({
                phone: data.phone,
                username: (0, randomPseudo_1.generateRandomPseudo)(),
                pin: bcrypt_1.default.hashSync(data.pin, 10),
            });
            await user.save();
            socket.emit('register', { success: true, id: user._id, username: user.username });
        }
        catch (error) {
            socket.emit('register', { success: false });
        }
    });
    socket.on('searchUsers', async function message(data) {
        console.log('received: %s', data);
        const { id, search } = data;
        try {
            let users = await User_1.UserModel.find({ username: { $regex: search, $options: 'i' } }).select('username phone _id picture');
            users = users.filter(user => user._id.toString() !== id);
            const conversations = await conversation_1.ConversationModel.find({ users: { $in: [id] } }).select('users');
            const usersIds = conversations.map(conversation => conversation.usersId.filter(userId => userId !== id)[0]);
            users = users.filter(user => !usersIds.includes(user._id.toString()));
            socket.emit('searchUsers', { success: true, users });
        }
        catch (error) {
            socket.emit('searchUsers', { success: false });
        }
    });
    socket.on('getConversations', async function message(data) {
        console.log('received: %s', data);
        const { id } = data;
        try {
            let conversations = await conversation_1.ConversationModel.find({ usersId: { $in: [id] } }).select('name usersId pinnedBy lastMessage lastMessageDate lastMessageAuthorId lastMessageId');
            // recuperer pour chaucne des conversations l'autre utilisateur, récup sa photo et son pseudo
            for (let i = 0; i < conversations.length; i++) {
                const conversation = conversations[i];
                const userId = conversation.usersId.filter(userId => userId !== id)[0];
                const user = await User_1.UserModel.findById(userId).select('username picture');
                if (!user) {
                    continue;
                }
                conversations[i] = Object.assign(Object.assign({}, conversation.toObject()), { name: user.username, picture: user.picture, _id: conversation._id });
            }
            socket.emit('getConversations', { success: true, conversations });
        }
        catch (error) {
            console.log(error);
            socket.emit('getConversations', { success: false });
        }
    });
});
(0, connecToDb_1.connectToDb)();
//# sourceMappingURL=main.js.map