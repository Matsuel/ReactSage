import { createServer } from 'http'
import express from 'express'
import { Server } from 'socket.io';
import cors from 'cors';

export const createWebSocketServer = ({
    address,
    port
}: {
    address: string,
    port: number
}): Server | undefined => {
    try {
        const app = express();
        app.use(cors())
        const server = createServer(app);
        const io = new Server(server, {
            cors: {
                origin: `http://${address}:${port}`,
                methods: ["GET", "POST"],
                credentials: true
            },
            maxHttpBufferSize: 1e9
        });
        server.listen(port, () => {
            console.log(`Server is running on port ${port} 👂`);
        });
        return io
    } catch (error) {
        console.log(error);
    }
    return undefined;
}