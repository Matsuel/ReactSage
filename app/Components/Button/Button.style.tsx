import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    btnContainer: {
        color: '#fff',
        padding: 16,
        borderRadius: 16,
        gap: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontFamily: 'Outfit_700Bold',
    },
    default: {
        backgroundColor: '#151515',
        color: '#fff',
    },
    primary: {
        backgroundColor: '#007AFF',
        color: '#fff',
    },
    transparent: {
        backgroundColor: 'transparent',
        color: '#fff',
    }
});