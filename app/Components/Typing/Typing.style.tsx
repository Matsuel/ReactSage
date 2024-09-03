import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: "auto",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    bubblesContainer : {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    bubble: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#2e2f31',
    },
});