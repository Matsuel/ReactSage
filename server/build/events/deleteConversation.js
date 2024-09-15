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
const message_1 = require("../scheme/message");
const mongoose_1 = __importDefault(require("mongoose"));
const createConversation = (data, socket) => __awaiter(void 0, void 0, void 0, function* () {
    socket.on('deleteConversation', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, conversationId } = data;
        try {
            if (!(yield conversation_1.ConversationModel.findOne({ _id: conversationId, usersId: { $in: [id] } })))
                return socket.emit('getMessages', { success: false, message: 'Conversation not found' });
            const conversation = yield conversation_1.ConversationModel.findOne({ _id: conversationId });
            if (!conversation)
                return socket.emit('getMessages', { success: false, message: 'Conversation not found' });
            yield conversation_1.ConversationModel.deleteOne({ _id: conversationId });
            // supprimer la collection des messages de la conversation
            const conversationCollection = mongoose_1.default.model('Conversation' + conversation._id, message_1.Message);
            yield conversationCollection.collection.drop();
            socket.emit('deleteConversation', { success: true });
        }
        catch (error) {
            console.log(error);
            socket.emit('deleteConversation', { success: false });
        }
    }));
});
exports.default = createConversation;
