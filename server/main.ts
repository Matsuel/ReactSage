import { getLocalIpV4 } from './functions/getLocalIp'
import { getFileInApp } from './functions/getFileInApp'
import { replaceFileContent } from './functions/replaceFilleContent'
import { createWebSocketServer } from './functions/initWS'
import { connectToDb } from './functions/connecToDb'
import { readdirSync } from 'fs'


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

io.on('connection', async (socket) => {

    //recuperer la liste de tous les fichiers dans le dossier events
    // pour chaque fichier, le nom de l'event est le nom du fichier sans l'extension et recuperer la fonction default
    // pour chaque event, on ecoute l'event et on execute la fonction default
    const events = readdirSync(__dirname + '/events').map((file: string) => file.split('.')[0])
    events.forEach((event: string) => {
        import(`${__dirname}/events/${event}`)
            .then(eventFunction => {
                const args = eventFunction.default.toString().match(/\(([^)]+)\)/)[1].split(',').map((arg: string) => arg.trim())
                console.log('Event:', event, 'Args:', args);
                socket.on(event, (data: any) => {
                    if (args.length === 3) eventFunction.default(data, socket, users)
                    else eventFunction.default(data, socket)
                })
            })
            .catch(console.error)
    })
});

connectToDb()