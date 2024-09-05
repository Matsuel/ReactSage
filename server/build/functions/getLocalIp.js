"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalIpV4 = void 0;
const os_1 = require("os");
const getLocalIpV4 = () => {
    const WiFiInterface = (0, os_1.networkInterfaces)()['Wi-Fi'];
    const ipV4 = WiFiInterface === null || WiFiInterface === void 0 ? void 0 : WiFiInterface.filter(({ family }) => family === 'IPv4')[0].address;
    return ipV4 || "127.0.0.1";
};
exports.getLocalIpV4 = getLocalIpV4;
