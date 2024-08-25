import { socket } from "../_layout";

export const emitEvent = (eventName: string, datas: any) => {
    socket.emit(eventName, datas)
}

export const listenEvent = (eventName: string, callback: (...args: any[]) => void) => {
    socket.on(eventName, callback)
}

export const emitAndListenEvent = (eventName: string, datas: any, callback: (...args: any[]) => void) => {
    socket.emit(eventName, datas)
    socket.on(eventName, callback)
}