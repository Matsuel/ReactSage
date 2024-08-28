"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationModel = exports.Conversation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.Conversation = new mongoose_1.default.Schema({
    createdAt: { type: Date, default: Date.now, required: true },
    isGroup: { type: Boolean, default: false, required: true },
    name: { type: String, required: false },
    usersId: { type: [String], required: true },
    pinnedBy: { type: [String], required: false },
    lastMessage: { type: String, required: false },
    lastMessageDate: { type: Date, required: false },
    lastMessageAuthorId: { type: String, required: false },
    lastMessageId: { type: String, required: false },
}, { collection: 'conversations' });
exports.ConversationModel = mongoose_1.default.model('Conversation', exports.Conversation);
//# sourceMappingURL=conversation.js.map