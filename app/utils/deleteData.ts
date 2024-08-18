import * as SecureStore from 'expo-secure-store';

export const deleteSecureData = async (key: any) => {
    try {
        await SecureStore.deleteItemAsync(key);
        return true
    } catch (error) {
        return false
    }
}