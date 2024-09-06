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
const getConversations = (data, socket) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.default = getConversations;
