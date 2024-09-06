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
const searchUsers = (data, socket) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, search } = data;
    try {
        let users = yield User_1.UserModel.find({ username: { $regex: search, $options: 'i' } }).select('username phone _id picture');
        // supprimer l'utilisateur courant de la liste
        // parmis les utilisateurs trouvés il faut supprimer les utilisateurs qui sont déjà dans les conversations de l'utilisateur courant
        const conversations = yield conversation_1.ConversationModel.find({ usersId: { $in: [id] } }).select('usersId');
        const usersId = conversations.map(conversation => conversation.usersId).flat();
        users = users.filter(user => user._id.toString() !== id && !usersId.includes(user._id.toString()));
        socket.emit('searchUsers', { success: true, users });
    }
    catch (error) {
        socket.emit('searchUsers', { success: false });
    }
});
exports.default = searchUsers;
