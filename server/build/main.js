"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const conversation_1 = require("./scheme/conversation");
const mongoose_1 = __importDefault(require("mongoose"));
const message_1 = require("./scheme/message");
const fs_1 = require("fs");
const IPTOUSE = (0, getLocalIp_1.getLocalIpV4)();
console.log("\x1b[34mServer will run on IP:", IPTOUSE, "\x1b[0m");
const hasFlags = (...flags) => flags.every(flag => process.argv.includes(/^-{1,2}/.test(flag) ? flag : '--' + flag));
if (hasFlags('-r') || hasFlags('replace')) {
    console.log('Replace mode');
    const envFilePath = (0, getFileInApp_1.getFileInApp)(".env.local");
    (0, replaceFilleContent_1.replaceFileContent)(envFilePath, "EXPO_PUBLIC_SERVER_IP=", IPTOUSE);
}
const io = (0, initWS_1.createWebSocketServer)({ address: IPTOUSE, port: 8080 });
if (!io) {
    console.log('Server not started');
    process.exit();
}
let users = {};
// const events = require('fs').readdirSync(__dirname + '/events').map((file: string) => file.split('.')[0])
// events.forEach((event: string) => {
//     console.log(event);
//     import(`${__dirname}/events/${event}`)
//         .then(eventFunction => {
//             const args = eventFunction.default.toString().match(/\(([^)]+)\)/)[1].split(',').map((arg: string) => arg.trim())
//             console.log('Event:', event, 'Args:', args);
//             io.on(event, (data: any) => {
//                 if (args.length === 3) eventFunction.default(data, io, users)
//                 else eventFunction.default(data, io)
//             })
//         })
//         .catch(console.error)
// })
io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    //recuperer la liste de tous les fichiers dans le dossier events
    // pour chaque fichier, le nom de l'event est le nom du fichier sans l'extension et recuperer la fonction default
    // pour chaque event, on ecoute l'event et on execute la fonction default
    const events = (0, fs_1.readdirSync)(__dirname + '/events').map((file) => file.split('.')[0]);
    events.forEach((event) => {
        Promise.resolve(`${`${__dirname}/events/${event}`}`).then(s => __importStar(require(s))).then(eventFunction => {
            const args = eventFunction.default.toString().match(/\(([^)]+)\)/)[1].split(',').map((arg) => arg.trim());
            console.log('Event:', event, 'Args:', args);
            socket.on(event, (data) => {
                if (args.length === 3)
                    eventFunction.default(data, socket, users);
                else
                    eventFunction.default(data, socket);
            });
        })
            .catch(console.error);
    });
    socket.on('login', function message(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phone } = data;
            try {
                const user = yield User_1.UserModel.findOne({ phone });
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
    socket.on('getConversations', function message(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('received: %s', data);
            const { id } = data;
            try {
                let conversations = yield conversation_1.ConversationModel.find({ usersId: { $in: [id] } }).select('name usersId pinnedBy lastMessage lastMessageDate lastMessageAuthorId lastMessageId isGroup createdAt');
                // recuperer pour chaucne des conversations l'autre utilisateur, récup sa photo et son pseudo
                for (let i = 0; i < conversations.length; i++) {
                    const conversation = conversations[i];
                    const userId = conversation.usersId.filter(userId => userId !== id)[0];
                    const user = yield User_1.UserModel.findById(userId).select('username picture');
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
    socket.on('createConversation', function message(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, otherId } = data;
            console.log(id, otherId);
            try {
                if (yield conversation_1.ConversationModel.findOne({ usersId: [id, otherId] }))
                    return socket.emit('createConversation', { success: false, message: 'Conversation already exist' });
                if (yield conversation_1.ConversationModel.findOne({ usersId: [otherId, id] }))
                    return socket.emit('createConversation', { success: false, message: 'Conversation already exist' });
                const conversation = new conversation_1.ConversationModel({
                    usersId: [id, otherId],
                    isGroup: false,
                    createdAt: new Date(),
                    pinnedBy: [],
                });
                yield conversation.save();
                let conversationCollection = mongoose_1.default.model('Conversation' + conversation._id, message_1.Message);
                conversationCollection.createCollection();
                socket.emit('createConversation', { success: true });
            }
            catch (error) {
                console.log(error);
                socket.emit('createConversation', { success: false });
            }
        });
    });
    socket.on('typing', function message(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, conversationId, name } = data;
            if (!(yield conversation_1.ConversationModel.findOne({ _id: conversationId, usersId: { $in: [id] } })))
                return socket.emit('typing', { success: false, message: 'Conversation not found' });
            const conversation = yield conversation_1.ConversationModel.findById(conversationId);
            if (!conversation)
                return socket.emit('typing', { success: false, message: 'Conversation not found' });
            const otherId = conversation.usersId.filter(userId => userId !== id)[0];
            if (Object.keys(users).includes(otherId)) {
                users[otherId].emit('typing', { name });
            }
            else {
                console.log('User not connected');
            }
        });
    });
    socket.on('updateViewed', function message(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, conversationId } = data;
            console.log(data);
            if (!(yield conversation_1.ConversationModel.findOne({ _id: conversationId, usersId: { $in: [id] } })))
                return socket.emit('updateViewed', { success: false, message: 'Conversation not found' });
            const conversation = yield conversation_1.ConversationModel.findById(conversationId);
            if (!conversation)
                return socket.emit('updateViewed', { success: false, message: 'Conversation not found' });
            const lastMessageId = conversation.lastMessageId;
            let conversationCollection = mongoose_1.default.model('Conversation' + conversationId, message_1.Message);
            // supprimer de tous les messages du chat l'utilisateur courant de viewedBy
            yield conversationCollection.updateMany({ viewedBy: { $in: [id] } }, { $pull: { viewedBy: id } });
            yield conversationCollection.updateMany({ _id: { $eq: lastMessageId } }, { $push: { viewedBy: id } });
        });
    });
}));
(0, connecToDb_1.connectToDb)();
