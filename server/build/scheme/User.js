"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.User = new mongoose_1.default.Schema({
    phone: { type: String, unique: true },
    username: { type: String, unique: true },
    pin: { type: String },
    joinedAt: { type: Date, default: Date.now },
    options: {
        showOnline: { type: Boolean, default: true },
    }
}, { collection: 'users' });
exports.UserModel = mongoose_1.default.model('User', exports.User);
//# sourceMappingURL=User.js.map