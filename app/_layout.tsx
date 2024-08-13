import { Stack } from 'expo-router'
import { UserInactivityProvider } from './Contexts/UserInactivity'

export default function Layout() {
    return (
        <UserInactivityProvider>
            <Stack>
                <Stack.Screen name='index' options={{headerShown: false}} />
                <Stack.Screen name='inactive' options={{headerShown: false, animation: 'none'}} />
                <Stack.Screen name='lock' options={{headerShown: false, animation: 'none'}} />
            </Stack>
        </UserInactivityProvider>
    )
}