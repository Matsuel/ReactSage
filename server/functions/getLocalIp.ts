import { networkInterfaces } from 'os'

export const getLocalIpV4 = (): string => {
    const WiFiInterface = networkInterfaces()['Wi-Fi']

    const ipV4 = WiFiInterface?.filter(({ family }) => family === 'IPv4')[0].address

    return ipV4 || "127.0.0.1"
}