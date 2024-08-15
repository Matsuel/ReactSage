import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

const LOCK_TIME = 30000;


export const UserInactivityProvider = ({ children }: any) => {
    const [startTime, setStartTime] = useState<number>(0)
    const appState = useRef(AppState.currentState)
    console.log(appState);
    const router = useRouter()

    useEffect(() => {
        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove;
        }
    }, [])

    const handleAppStateChange = (nextAppState: any) => {
        console.log('appState', appState.current, nextAppState);
        if (nextAppState === "inactive") {
            router.push('inactive')
        } else {
            if (router.canGoBack()) {
                router.back();
            }
        }

        if (nextAppState === "background") {
            recordStartTime()
        } else if (nextAppState === 'active' && appState.current.match(/background/)) {
            if (Date.now() - startTime > LOCK_TIME) {
                router.push('lock')
            }
        }
        appState.current = nextAppState;
    }

    const recordStartTime = () => {
        setStartTime(Date.now())
    }


    return children;
}