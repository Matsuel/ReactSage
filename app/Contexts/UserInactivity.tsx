import SyncStorage from 'sync-storage'
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';

const LOCK_TIME = 3000;


export const UserInactivityProvider = ({ children }: any) => {
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
        } else if (router.canGoBack()) {
            router.back();
        }

        if (nextAppState === "background") {
            recordStartTime()
        } else if (nextAppState === 'active' && appState.current.match(/background/)) {
            
        }
        appState.current = nextAppState;
    }

    const recordStartTime = async () => {
        // SyncStorage.set('startTime', Date.now())
    }


    return children;
}