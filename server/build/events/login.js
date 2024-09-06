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
const User_1 = require("../scheme/User");
const login = (data, socket) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone } = data;
    try {
        const user = yield User_1.UserModel.findOne({ phone });
        if (user) {
            socket.emit('login', { success: true, id: user._id, username: user.username, phone: user.phone, pin: user.pin });
        }
        else {
            socket.emit('login', { success: false, message: 'User not found' });
        }
    }
    catch (error) {
        socket.emit('login', { success: false, message: 'Login failed' });
    }
});
exports.default = login;
