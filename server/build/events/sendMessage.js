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
const mongoose_1 = __importDefault(require("mongoose"));
const conversation_1 = require("../scheme/conversation");
const message_1 = require("../scheme/message");
const sendMessage = (data, socket, users) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    const { id, conversationId, message } = data;
    try {
        if (!(yield conversation_1.ConversationModel.findOne({ _id: conversationId, usersId: { $in: [id] } })))
            return socket.emit('sendMessage', { success: false, message: 'Conversation not found' });
        let conversationCollection = mongoose_1.default.model('Conversation' + conversationId, message_1.Message);
        const newMessage = new conversationCollection({
            authorId: id,
            content: message,
            date: new Date(),
            viewedBy: [],
        });
        yield newMessage.save();
        const conversation = yield conversation_1.ConversationModel.findById(conversationId);
        if (conversation) {
            conversation.lastMessage = message;
            conversation.lastMessageDate = new Date();
            conversation.lastMessageAuthorId = id;
            conversation.lastMessageId = newMessage._id;
            yield conversation.save();
            const otherId = conversation.usersId.filter(userId => userId !== id)[0];
            if (users[otherId]) {
                users[otherId].emit('newMessage', { conversationId });
            }
            else {
                console.log('user not found');
            }
        }
        socket.emit('sendMessage', { success: true });
    }
    catch (error) {
        console.log(error);
        socket.emit('sendMessage', { success: false });
    }
});
exports.default = sendMessage;
