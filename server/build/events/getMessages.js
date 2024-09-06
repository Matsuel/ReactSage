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
const getMessages = (data, socket) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, conversationId } = data;
    try {
        if (!(yield conversation_1.ConversationModel.findOne({ _id: conversationId, usersId: { $in: [id] } })))
            return socket.emit('getMessages', { success: false, message: 'Conversation not found' });
        let conversationCollection = mongoose_1.default.model('Conversation' + conversationId, message_1.Message);
        let messages = yield conversationCollection.find().sort({ createdAt: 1 });
        socket.emit('getMessages', { success: true, messages });
    }
    catch (error) {
        console.log(error);
        socket.emit('getMessages', { success: false });
    }
});
exports.default = getMessages;
