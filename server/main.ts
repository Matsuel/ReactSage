import { getLocalIpV4 } from './functions/getLocalIp'
import { getFileInApp } from './functions/getFileInApp'
import { replaceFileContent } from './functions/replaceFilleContent'
import { createWebSocketServer } from './functions/initWS'

const IPTOUSE = getLocalIpV4()

console.log("\x1b[34mServer will run on IP:", IPTOUSE, "\x1b[0m")

const envFilePath = getFileInApp(".env.local")

replaceFileContent(envFilePath, "SERVER_IP=", IPTOUSE)

createWebSocketServer({ address: IPTOUSE, port: 8080 })