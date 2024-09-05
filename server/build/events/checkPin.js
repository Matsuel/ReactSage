"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../scheme/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const checkPin = async (data, socket) => {
    console.log(data);
    console.log('checkPin');
    const { phone, pin } = data;
    try {
        const user = await User_1.UserModel.findOne({ phone });
        if (user) {
            const match = bcrypt_1.default.compareSync(pin, user.pin);
            if (match) {
                socket.emit('checkPin', { success: true, id: user._id, username: user.username });
            }
            else {
                socket.emit('checkPin', { success: false, message: 'Pin not match' });
            }
        }
        else {
            socket.emit('checkPin', { success: false, message: 'User not found' });
        }
    }
    catch (error) {
        socket.emit('checkPin', { success: false, message: 'Login failed' });
    }
};
exports.default = checkPin;
//# sourceMappingURL=checkPin.js.map