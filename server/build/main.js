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
const Redis = __importStar(require("redis"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
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
// io.on('connection', async (socket) => {
//     //recuperer la liste de tous les fichiers dans le dossier events
//     // pour chaque fichier, le nom de l'event est le nom du fichier sans l'extension et recuperer la fonction default
//     // pour chaque event, on ecoute l'event et on execute la fonction default
//     const events = readdirSync(__dirname + '/events').map((file: string) => file.split('.')[0])
//     events.forEach((event: string) => {
//         import(`${__dirname}/events/${event}`)
//             .then(eventFunction => {
//                 const args = eventFunction.default.toString().match(/\(([^)]+)\)/)[1].split(',').map((arg: string) => arg.trim())
//                 console.log('Event:', event, 'Args:', args);
//                 socket.on(event, (data: any) => {
//                     if (args.length === 3) eventFunction.default(data, socket, users)
//                     else eventFunction.default(data, socket)
//                 })
//             })
//             .catch(console.error)
//     })
// });
(0, connecToDb_1.connectToDb)();
const SLAVESSERVERCOUNT = 2;
const redisClient = Redis.createClient({
    url: 'redis://localhost:6379',
});
redisClient.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});
redisClient.connect().then(() => {
    console.log('Connected to Redis');
}).catch(console.error);
const getServerLoads = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Utiliser des méthodes basées sur les promesses
        const keys = yield redisClient.keys('server:*:load');
        if (keys.length === 0)
            return {};
        const loads = yield redisClient.mGet(keys);
        const serverLoads = {};
        keys.forEach((key, index) => {
            const serverId = key.split(':')[1];
            serverLoads[serverId] = parseInt(loads[index] || '0', 10);
        });
        return serverLoads;
    }
    catch (err) {
        console.error('Error fetching server loads:', err);
        throw err;
    }
});
for (let i = 0; i < SLAVESSERVERCOUNT; i++) {
    const port = 8090 + i;
    const server = (0, http_1.createServer)();
    server.listen(port, IPTOUSE, () => {
        console.log(`Server running at http://${IPTOUSE}:${port}/`);
    });
    const updateLoad = () => {
        redisClient.set(`server:${port}:load`, currentLoad);
    };
    const io = new socket_io_1.Server(server);
    let currentLoad = 0;
    updateLoad();
    // Gérer les connexions WebSocket
    io.on('connection', (socket) => {
        currentLoad++;
        updateLoad();
        console.log(`Client connected on port ${port}. Current load: ${currentLoad}`);
        socket.on('disconnect', () => {
            currentLoad--;
            updateLoad();
            console.log(`Client disconnected on port ${port}. Current load: ${currentLoad}`);
        });
        // Exemple de traitement des messages
        socket.on('message', (msg) => {
            // Logique pour traiter le message
        });
    });
}
getServerLoads().then((serverLoads) => {
    console.log('Server loads:', serverLoads);
}).catch(console.error);
