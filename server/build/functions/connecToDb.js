"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDb = async () => {
    try {
        const client = await mongoose_1.default.connect("mongodb://localhost:27017/ReactSage", {});
        console.log('\x1b[34mConnected to the database\x1b[0m');
        return client;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.connectToDb = connectToDb;
//# sourceMappingURL=connecToDb.js.map