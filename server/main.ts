import { getLocalIpV4 } from './functions/getLocalIp'
import { getFileInApp } from './functions/getFileInApp'
import { replaceFileContent } from './functions/replaceFilleContent'
import { createWebSocketServer } from './functions/initWS'
import { connectToDb } from './functions/connecToDb'
import { readdirSync } from 'fs'
import * as Redis from 'redis'
import { createServer } from 'http';
import { Server } from 'socket.io';


const IPTOUSE = getLocalIpV4()

console.log("\x1b[34mServer will run on IP:", IPTOUSE, "\x1b[0m")


const hasFlags = (...flags: string[]) =>
    flags.every(flag =>
        process.argv.includes(/^-{1,2}/.test(flag) ? flag : '--' + flag)
    );

if (hasFlags('-r') || hasFlags('replace')) {
    console.log('Replace mode');
    const envFilePath = getFileInApp(".env.local")

    replaceFileContent(envFilePath, "EXPO_PUBLIC_SERVER_IP=", IPTOUSE)
}

const io = createWebSocketServer({ address: IPTOUSE, port: 8080 })

if (!io) {
    console.log('Server not started');
    process.exit()
}


let users: { [key: string]: any } = {}

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

connectToDb()

const SLAVESSERVERCOUNT = 2

const redisClient = Redis.createClient({
    url: 'redis://localhost:6379',
});

redisClient.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});

redisClient.connect().then(() => {
    console.log('Connected to Redis');
}).catch(console.error);

const getServerLoads = async () => {
    try {
        // Utiliser des méthodes basées sur les promesses
        const keys = await redisClient.keys('server:*:load');
        if (keys.length === 0) return {};

        const loads = await redisClient.mGet(keys);

        const serverLoads: { [key: string]: number } = {};
        keys.forEach((key, index) => {
            const serverId = key.split(':')[1];
            serverLoads[serverId] = parseInt(loads[index] || '0', 10);
        });

        return serverLoads;
    } catch (err) {
        console.error('Error fetching server loads:', err);
        throw err;
    }
};

for (let i = 0; i < SLAVESSERVERCOUNT; i++) {
    const port = 8090 + i
    const server = createServer()
    server.listen(port, IPTOUSE, () => {
        console.log(`Server running at http://${IPTOUSE}:${port}/`);
    });
    const updateLoad = () => {
        redisClient.set(`server:${port}:load`, currentLoad);
    };
    const io = new Server(server);
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