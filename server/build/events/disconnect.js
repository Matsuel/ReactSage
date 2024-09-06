"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const disconnect = (data, socket, users) => {
    console.log('user disconnected');
    for (let [key, value] of Object.entries(users)) {
        if (value === socket) {
            delete users[key];
            break;
        }
    }
};
exports.default = disconnect;
