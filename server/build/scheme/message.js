"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.Message = new mongoose_1.default.Schema({
    authorId: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
    viewedBy: { type: [String], required: false }
});
