const disconnect = (data: any, socket: any, users: { [key: string]: any }) => {
    console.log('user disconnected');
    for (let [key, value] of Object.entries(users)) {
        if (value === socket) {
            delete users[key]
            break
        }
    }
}

export default disconnect;