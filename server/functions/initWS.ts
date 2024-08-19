import { Server } from 'ws'

export const createWebSocketServer = ({
    address,
    port
}: {
    address: string,
    port: number
}): Server => {
    const wss = new Server({ host: address, port: port })
    console.log(`\x1b[34mServer start on address ${address} and port ${port}\x1b[0m`);
    return wss
}