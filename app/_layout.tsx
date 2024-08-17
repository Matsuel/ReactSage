import { Stack } from 'expo-router'
import { UserInactivityProvider } from './Contexts/UserInactivity'
import { StatusBar } from 'expo-status-bar'

export default function Layout() {
    return (
        // <UserInactivityProvider>
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='lock' options={{ headerShown: false, animation: 'none', presentation: "modal", gestureEnabled: false }} />
            <Stack.Screen name='inactive' options={{ headerShown: false, animation: 'none' }} />
            <Stack.Screen name='login' options={{ headerShown: false, animation: 'none', presentation: "modal", gestureEnabled: true }} />
            <Stack.Screen name='otp' options={{ headerShown: false, animation: 'none', presentation: "modal", gestureEnabled: false }} />
        </Stack>
        // </UserInactivityProvider>
    )
}