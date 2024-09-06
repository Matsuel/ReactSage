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
const randomPseudo_1 = require("../functions/randomPseudo");
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = (data, socket) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, pin } = data;
    try {
        const user = new User_1.UserModel({
            phone: phone,
            username: (0, randomPseudo_1.generateRandomPseudo)(),
            pin: bcrypt_1.default.hashSync(pin, 10),
        });
        yield user.save();
        socket.emit('register', { success: true, id: user._id, username: user.username });
    }
    catch (error) {
        socket.emit('register', { success: false });
    }
});
exports.default = register;
