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
const blockParticipant = (data, socket) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('blockParticipant', data);
    const { conversationId, id, userToLock } = data;
    try {
        const conversation = yield conversation_1.ConversationModel.findOne({ _id: conversationId });
        if (conversation) {
            if (conversation.usersId.includes(id) && conversation.usersId.includes(userToLock)) {
                const requestedUser = yield User_1.UserModel.findById(id);
                if (!(requestedUser === null || requestedUser === void 0 ? void 0 : requestedUser.lockedId.includes(userToLock))) {
                    requestedUser === null || requestedUser === void 0 ? void 0 : requestedUser.lockedId.push(userToLock);
                    yield (requestedUser === null || requestedUser === void 0 ? void 0 : requestedUser.save());
                }
                socket.emit('blockParticipant', { success: true });
            }
        }
        else {
            socket.emit('blockParticipant', { success: false, message: 'Conversation not found' });
        }
    }
    catch (error) {
        console.log('blockParticipant error', error);
        socket.emit('blockParticipant', { success: false, message: 'blockParticipant failed' });
    }
});
exports.default = blockParticipant;
