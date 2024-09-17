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
const User_1 = require("../scheme/User");
const conversationInfos = (data, socket) => __awaiter(void 0, void 0, void 0, function* () {
    const { conversationId, id } = data;
    try {
        if (!(yield conversation_1.ConversationModel.findOne({ _id: conversationId, usersId: { $in: [id] } })))
            return socket.emit('conversationInfos', { success: false, message: 'Conversation not found' });
        const conversation = yield conversation_1.ConversationModel.findOne({ _id: conversationId });
        if (!conversation)
            return socket.emit('conversationInfos', { success: false, message: 'Conversation not found' });
        const createdAt = conversation.createdAt;
        let usersInfos = [];
        for (let userId of conversation.usersId) {
            const user = yield User_1.UserModel.findOne({ _id: userId });
            if (!user)
                return socket.emit('conversationInfos', { success: false, message: 'User not found' });
            usersInfos.push({ id: user._id, username: user.username, picture: user.picture });
        }
        // plus tard les pièces jointes
        socket.emit('conversationInfos', { success: true, conversationInfos: { usersInfos, createdAt } });
    }
    catch (error) {
        console.log(error);
        socket.emit('conversationInfos', { success: false });
    }
});
exports.default = conversationInfos;
