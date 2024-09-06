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
const updateViewed = (data, socket) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.default = updateViewed;
