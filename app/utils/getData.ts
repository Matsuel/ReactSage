import * as SecureStore from 'expo-secure-store';

export const getSecureData = async (key: any) => {
    try {
        const datas = await SecureStore.getItemAsync(key);
        return datas
    } catch (error) {
        return false
    }
};