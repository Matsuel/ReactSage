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
const User_1 = require("../scheme/User");
const conversation_1 = require("../scheme/conversation");
const message_1 = require("../scheme/message");
const mongoose_1 = __importDefault(require("mongoose"));
const createConversation = (data, socket) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = data;
    try {
        yield User_1.UserModel.deleteOne({ _id: id });
        // recuperer tous les id des conversations de l'utilisateur
        const conversations = yield conversation_1.ConversationModel.find({ usersId: { $in: [id] } });
        // suppression toutes les conversations
        yield conversation_1.ConversationModel.deleteMany({ usersId: { $in: [id] } });
        // pour chaque conversation supprimer la collection des messages conversation+id
        for (let conversation of conversations) {
            const conversationCollection = mongoose_1.default.model('Conversation' + conversation._id, message_1.Message);
            yield conversationCollection.collection.drop();
        }
        socket.emit('deleteAccount', { success: true });
    }
    catch (error) {
        console.log(error);
        socket.emit('deleteAccount', { success: false });
    }
});
exports.default = createConversation;
