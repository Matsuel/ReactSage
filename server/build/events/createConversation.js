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
const conversation_1 = require("../scheme/conversation");
const mongoose_1 = __importDefault(require("mongoose"));
const message_1 = require("../scheme/message");
const User_1 = require("../scheme/User");
const createConversation = (data, socket) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, otherId } = data;
    try {
        if (yield conversation_1.ConversationModel.findOne({ usersId: [id, otherId] }))
            return socket.emit('createConversation', { success: false, message: 'Conversation already exist' });
        if (yield conversation_1.ConversationModel.findOne({ usersId: [otherId, id] }))
            return socket.emit('createConversation', { success: false, message: 'Conversation already exist' });
        // si l'utilisateur courant a bloqué l'autre utilisateur, il faut le débloquer
        const requestedUser = yield User_1.UserModel.findById(id);
        if (requestedUser) {
            requestedUser.lockedId = requestedUser.lockedId.filter((lockedId) => lockedId !== otherId);
            yield requestedUser.save();
        }
        // si l'autre utilisateur a bloqué l'utilisateur courant, on ne peut pas créer la conversation
        const otherUser = yield User_1.UserModel.findById(otherId);
        if (otherUser && otherUser.lockedId.includes(id)) {
            return socket.emit('createConversation', { success: false, message: 'You are blocked by this user' });
        }
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
exports.default = createConversation;
