import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    btnContainer: {
        color: '#fff',
        padding: 16,
        borderRadius: 16,
        gap: 32,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontFamily: 'Outfit_700Bold',
    },
    default: {
        backgroundColor: '#202020',
        color: '#fff',
    },
    primary: {
        backgroundColor: '#d8dce2',
        color: '#fff',
    },
    light: {
        backgroundColor: '#fff',
        color: '#000',
    },
    disabled: {
        backgroundColor: '#515151',
        color: '#000',
    },
    transparentLight: {
        backgroundColor: 'transparent',
        color: '#fff',
    },
    transparentDark: {
        backgroundColor: 'transparent',
        color: '#000',
    },
});