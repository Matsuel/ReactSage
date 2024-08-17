import { Stack } from 'expo-router'

export default function Layout() {
    return (
        // <UserInactivityProvider>
        <Stack>
            {/* Regler problèmes des modals qui ne redirigent pas vers une page  */}
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='inactive' options={{ headerShown: false, animation: 'none' }} />
            <Stack.Screen name='login' options={{ headerShown: false, animation: 'none', gestureEnabled: true, presentation: "modal" }} />
            <Stack.Screen name='otp' options={{ headerShown: false, animation: 'none', gestureEnabled: false, presentation: "modal" }} />
            <Stack.Screen name='lock' options={{ headerShown: false, animation: 'none', gestureEnabled: false, presentation: "modal" }} />
            <Stack.Screen name='homepage' options={{ headerShown: false }} />
        </Stack>
        // </UserInactivityProvider>
    )
}