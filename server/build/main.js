"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const getLocalIp_1 = require("./functions/getLocalIp");
const getFileInApp_1 = require("./functions/getFileInApp");
const replaceFilleContent_1 = require("./functions/replaceFilleContent");
const initWS_1 = require("./functions/initWS");
const connecToDb_1 = require("./functions/connecToDb");
const fs_1 = require("fs");
const IPTOUSE = (0, getLocalIp_1.getLocalIpV4)();
console.log("\x1b[34mServer will run on IP:", IPTOUSE, "\x1b[0m");
const hasFlags = (...flags) => flags.every(flag => process.argv.includes(/^-{1,2}/.test(flag) ? flag : '--' + flag));
if (hasFlags('-r') || hasFlags('replace')) {
    console.log('Replace mode');
    const envFilePath = (0, getFileInApp_1.getFileInApp)(".env.local");
    (0, replaceFilleContent_1.replaceFileContent)(envFilePath, "EXPO_PUBLIC_SERVER_IP=", IPTOUSE);
}
const io = (0, initWS_1.createWebSocketServer)({ address: IPTOUSE, port: 8080 });
if (!io) {
    console.log('Server not started');
    process.exit();
}
let users = {};
io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('New connection:', socket.id);
    //recuperer la liste de tous les fichiers dans le dossier events
    // pour chaque fichier, le nom de l'event est le nom du fichier sans l'extension et recuperer la fonction default
    // pour chaque event, on ecoute l'event et on execute la fonction default
    const events = (0, fs_1.readdirSync)(__dirname + '/events').map((file) => file.split('.')[0]);
    events.forEach((event) => {
        Promise.resolve(`${`${__dirname}/events/${event}`}`).then(s => __importStar(require(s))).then(eventFunction => {
            const args = eventFunction.default.toString().match(/\(([^)]+)\)/)[1].split(',').map((arg) => arg.trim());
            console.log('Event:', event, 'Args:', args);
            socket.on(event, (data) => {
                if (args.length === 3)
                    eventFunction.default(data, socket, users);
                else
                    eventFunction.default(data, socket);
            });
        })
            .catch(console.error);
    });
}));
(0, connecToDb_1.connectToDb)();
