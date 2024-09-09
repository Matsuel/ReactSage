"use strict";
// const io = createWebSocketServer({ address: IPTOUSE, port: 8080 })
// if (!io) {
//     console.log('Server not started');
//     process.exit()
// }
// let users: { [key: string]: any } = {}
// io.on('connection', async (socket) => {
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
// connectToDb()
