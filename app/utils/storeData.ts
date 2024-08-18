import * as SecureStore from 'expo-secure-store';

export const storeSecureData = async (key: any, value: any) => {
    try {
        await SecureStore.setItemAsync(key, value);
        return true
    } catch (error) {
        return false
    }
};