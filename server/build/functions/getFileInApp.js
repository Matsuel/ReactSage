"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileInApp = void 0;
const path_1 = require("path");
const getFileInApp = (pathFromApp) => {
    const filePath = (0, path_1.dirname)(__filename).replace("\\build\\functions", "").replace("server", pathFromApp);
    return filePath;
};
exports.getFileInApp = getFileInApp;
