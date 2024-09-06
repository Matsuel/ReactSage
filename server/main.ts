import { getLocalIpV4 } from './functions/getLocalIp'
import { getFileInApp } from './functions/getFileInApp'
import { replaceFileContent } from './functions/replaceFilleContent'
import { createWebSocketServer } from './functions/initWS'
import { connectToDb } from './functions/connecToDb'
import { UserModel } from './scheme/User'
import { generateRandomPseudo } from './functions/randomPseudo'
import bcrypt from 'bcrypt'
import { ConversationModel } from './scheme/conversation'
import mongoose from 'mongoose'
import { Message } from './scheme/message'
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

// const events = require('fs').readdirSync(__dirname + '/events').map((file: string) => file.split('.')[0])
// events.forEach((event: string) => {
//     console.log(event);

//     import(`${__dirname}/events/${event}`)
//         .then(eventFunction => {
//             const args = eventFunction.default.toString().match(/\(([^)]+)\)/)[1].split(',').map((arg: string) => arg.trim())
//             console.log('Event:', event, 'Args:', args);
//             io.on(event, (data: any) => {
//                 if (args.length === 3) eventFunction.default(data, io, users)
//                 else eventFunction.default(data, io)
//             })
//         })
//         .catch(console.error)
// })

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

    socket.on('login', async function message(data) {
        const { phone } = data
        try {
            const user = await UserModel.findOne({ phone })
            if (user) {
                socket.emit('login', { success: true, id: user._id, username: user.username, phone: user.phone, pin: user.pin })
            } else {
                socket.emit('login', { success: false, message: 'User not found' });
            }
        } catch (error) {
            socket.emit('login', { success: false, message: 'Login failed' });
        }
    });

    socket.on('register', async function message(data) {
        console.log('received: %s', data);

        try {
            const user = new UserModel({
                phone: data.phone,
                username: generateRandomPseudo(),
                pin: bcrypt.hashSync(data.pin, 10),
            })

            await user.save()
            socket.emit('register', { success: true, id: user._id, username: user.username })

        } catch (error) {
            socket.emit('register', { success: false })
        }
    });

    socket.on('getConversations', async function message(data) {
        console.log('received: %s', data);
        const { id } = data
        try {
            let conversations = await ConversationModel.find({ usersId: { $in: [id] } }).select('name usersId pinnedBy lastMessage lastMessageDate lastMessageAuthorId lastMessageId isGroup createdAt')
            // recuperer pour chaucne des conversations l'autre utilisateur, récup sa photo et son pseudo
            for (let i = 0; i < conversations.length; i++) {
                const conversation = conversations[i]
                const userId = conversation.usersId.filter(userId => userId !== id)[0]
                const user = await UserModel.findById(userId).select('username picture')
                if (!user) {
                    continue
                }
                conversations[i] = { ...conversation.toObject(), name: user.username, picture: user.picture, _id: conversation._id } as any
            }
            socket.emit('getConversations', { success: true, conversations })
        } catch (error) {
            console.log(error);

            socket.emit('getConversations', { success: false })
        }
    });

    socket.on('createConversation', async function message(data) {
        const { id, otherId } = data
        console.log(id, otherId);
        try {
            if (await ConversationModel.findOne({ usersId: [id, otherId] })) return socket.emit('createConversation', { success: false, message: 'Conversation already exist' })
            if (await ConversationModel.findOne({ usersId: [otherId, id] })) return socket.emit('createConversation', { success: false, message: 'Conversation already exist' })
            const conversation = new ConversationModel({
                usersId: [id, otherId],
                isGroup: false,
                createdAt: new Date(),
                pinnedBy: [],
            })
            await conversation.save()
            let conversationCollection = mongoose.model('Conversation' + conversation._id, Message)
            conversationCollection.createCollection()
            socket.emit('createConversation', { success: true })
        } catch (error) {
            console.log(error);
            socket.emit('createConversation', { success: false })
        }
    });

    socket.on('typing', async function message(data) {
        const { id, conversationId, name } = data
        if (!await ConversationModel.findOne({ _id: conversationId, usersId: { $in: [id] } })) return socket.emit('typing', { success: false, message: 'Conversation not found' })
        const conversation = await ConversationModel.findById(conversationId)
        if (!conversation) return socket.emit('typing', { success: false, message: 'Conversation not found' })
        const otherId = conversation.usersId.filter(userId => userId !== id)[0]
        if (Object.keys(users).includes(otherId)) {
            users[otherId].emit('typing', { name })
        } else {
            console.log('User not connected');
        }
    });

    socket.on('updateViewed', async function message(data) {
        const { id, conversationId } = data
        console.log(data);
        if (!await ConversationModel.findOne({ _id: conversationId, usersId: { $in: [id] } })) return socket.emit('updateViewed', { success: false, message: 'Conversation not found' })
        const conversation = await ConversationModel.findById(conversationId)
        if (!conversation) return socket.emit('updateViewed', { success: false, message: 'Conversation not found' })
        const lastMessageId = conversation.lastMessageId
        let conversationCollection = mongoose.model('Conversation' + conversationId, Message)
        // supprimer de tous les messages du chat l'utilisateur courant de viewedBy
        await conversationCollection.updateMany({ viewedBy: { $in: [id] } }, { $pull: { viewedBy: id } })
        await conversationCollection.updateMany({ _id: { $eq: lastMessageId } }, { $push: { viewedBy: id } })
    });



});

connectToDb()

