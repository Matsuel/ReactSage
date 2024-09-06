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
Object.defineProperty(exports, "__esModule", { value: true });
const conversation_1 = require("../scheme/conversation");
const typing = (data, socket, users) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.default = typing;
