"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const path_1 = require("path");
const fs_1 = require("fs");
const WiFiInterface = (0, os_1.networkInterfaces)()['Wi-Fi'];
const ipToUse = WiFiInterface === null || WiFiInterface === void 0 ? void 0 : WiFiInterface.filter(({ family }) => family === 'IPv4')[0].address;
console.log("\x1b[34mServer will run on IP:", ipToUse, "\x1b[0m");
const envFilePath = (0, path_1.dirname)(__filename).replace('server', '.env.local');
const fileToRead = (0, fs_1.readFileSync)(envFilePath, 'utf8');
const content = fileToRead.split('\n');
const newContent = content.map(line => {
    if (line.startsWith('SERVER_IP=') && !line.endsWith(ipToUse)) {
        console.log("\x1b[34mReplacing line:\x1b[0m", line);
        console.log("\x1b[34mEnv file will be updated\x1b[0m");
        return `SERVER_IP=${ipToUse}`;
    }
    return line;
});
const arraysEqual = (a, b) => {
    if (a.length !== b.length)
        return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
};
if (arraysEqual(content, newContent)) {
    console.log("\x1b[34mEnv file is already up to date!\x1b[0m");
}
else {
    console.log("\x1b[34mEnv file has been updated!\x1b[0m");
    (0, fs_1.writeFileSync)(envFilePath, newContent.join('\n'), 'utf8');
}
