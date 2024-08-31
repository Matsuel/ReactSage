import { Stack } from 'expo-router'
import { io } from 'socket.io-client';
import * as StyleConst from './constantes/stylesConst'

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='welcome' options={{ headerShown: false, animation: "none", presentation: "modal", gestureEnabled: false }} />
            <Stack.Screen name='inactive' options={{ headerShown: false, animation: 'none' }} />
            <Stack.Screen name='login' options={{ headerShown: false, animation: 'none', gestureEnabled: true, presentation: "modal" }} />
            <Stack.Screen name='otp' options={{ headerShown: false, animation: 'none', gestureEnabled: false, presentation: "modal" }} />
            <Stack.Screen name='lock' options={{ headerShown: false, animation: 'none', gestureEnabled: false, presentation: "modal" }} />
            <Stack.Screen name='homepage' options={{ headerShown: false }} />
            <Stack.Screen name='createconversation' options={{ headerShown: false, gestureEnabled: true, presentation: "modal", contentStyle: StyleConst.modalStyles.container }} />
            <Stack.Screen name='activeConversation' options={{ headerShown: false, gestureEnabled: true, }} />
            <Stack.Screen name='profile' options={{ headerShown: false, gestureEnabled: true, presentation: "modal", contentStyle: StyleConst.modalStyles.container }} />
        </Stack>
    )
}

export const socket = io(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:8080`);