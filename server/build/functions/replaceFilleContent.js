"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceFileContent = void 0;
const arraysEquals_1 = require("./arraysEquals");
const fs_1 = require("fs");
const replaceFileContent = (filePath, oldStartLine, newValue) => {
    const fileToRead = (0, fs_1.readFileSync)(filePath, 'utf8');
    const content = fileToRead.split('\n');
    const newContentArray = content.map(line => {
        if (line.startsWith(oldStartLine) && !line.endsWith(newValue)) {
            console.log("\x1b[34mReplacing line:\x1b[0m", line, "\x1b[34mwith:\x1b[0m", `${oldStartLine}${newValue}`);
            console.log("\x1b[34mEnv file will be updated\x1b[0m");
            return `${oldStartLine}${newValue}`;
        }
        return line;
    });
    if ((0, arraysEquals_1.arraysEqual)(content, newContentArray)) {
        console.log("\x1b[34mEnv file is already up to date!\x1b[0m");
    }
    else {
        console.log("\x1b[34mEnv file has been updated!\x1b[0m");
        (0, fs_1.writeFileSync)(filePath, newContentArray.join('\n'), 'utf8');
    }
};
exports.replaceFileContent = replaceFileContent;
//# sourceMappingURL=replaceFilleContent.js.map