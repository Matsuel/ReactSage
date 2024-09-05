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

    socket.on('disconnect', function () {
        console.log('user disconnected');
        for (let [key, value] of Object.entries(users)) {
            if (value === socket) {
                delete users[key]
                break
            }
        }
    });

    socket.on('welcome', async function message(data) {
        const { id } = data
        users[id] = socket
        socket.emit('welcome', { success: true })
    });


    socket.on('checkPin', async function message(data) {
        console.log(data);

        const { phone, pin } = data
        try {
            const user = await UserModel.findOne({ phone })
            if (user) {
                const match = bcrypt.compareSync(pin, user.pin);
                if (match) {
                    socket.emit('checkPin', { success: true, id: user._id, username: user.username });
                } else {
                    socket.emit('checkPin', { success: false, message: 'Pin not match' });
                }
            } else {
                socket.emit('checkPin', { success: false, message: 'User not found' });
            }
        } catch (error) {
            socket.emit('checkPin', { success: false, message: 'Login failed' });
        }
    });

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

    socket.on('searchUsers', async function message(data) {
        console.log('received: %s', data);
        const { id, search } = data
        try {
            let users = await UserModel.find({ username: { $regex: search, $options: 'i' } }).select('username phone _id picture')
            // supprimer l'utilisateur courant de la liste
            // parmis les utilisateurs trouvés il faut supprimer les utilisateurs qui sont déjà dans les conversations de l'utilisateur courant
            const conversations = await ConversationModel.find({ usersId: { $in: [id] } }).select('usersId')
            const usersId = conversations.map(conversation => conversation.usersId).flat()
            users = users.filter(user => (user._id as string).toString() !== id && !usersId.includes((user._id as string).toString()))
            socket.emit('searchUsers', { success: true, users })
        } catch (error) {
            socket.emit('searchUsers', { success: false })
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

    socket.on('getMessages', async function message(data) {
        const { id, conversationId } = data

        try {
            if (!await ConversationModel.findOne({ _id: conversationId, usersId: { $in: [id] } })) return socket.emit('getMessages', { success: false, message: 'Conversation not found' })
            let conversationCollection = mongoose.model('Conversation' + conversationId, Message)
            let messages = await conversationCollection.find().sort({ createdAt: 1 })
            socket.emit('getMessages', { success: true, messages })
        } catch (error) {
            console.log(error);
            socket.emit('getMessages', { success: false })
        }
    });

    socket.on('sendMessage', async function message(data) {
        console.log(data);
        const { id, conversationId, message } = data
        try {
            if (!await ConversationModel.findOne({ _id: conversationId, usersId: { $in: [id] } })) return socket.emit('sendMessage', { success: false, message: 'Conversation not found' })
            let conversationCollection = mongoose.model('Conversation' + conversationId, Message)
            const newMessage = new conversationCollection({
                authorId: id,
                content: message,
                date: new Date(),
                viewedBy: [],
            })
            await newMessage.save()
            const conversation = await ConversationModel.findById(conversationId)
            if (conversation) {
                conversation.lastMessage = message;
                conversation.lastMessageDate = new Date()
                conversation.lastMessageAuthorId = id
                conversation.lastMessageId = newMessage._id as string
                await conversation.save()
                const otherId = conversation.usersId.filter(userId => userId !== id)[0]
                if (users[otherId]) {
                    users[otherId].emit('newMessage', { conversationId })
                }
            }
            socket.emit('sendMessage', { success: true })
        } catch (error) {
            console.log(error);
            socket.emit('sendMessage', { success: false })
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

