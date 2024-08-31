import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: "auto",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        paddingTop: 55,
    },
    infosContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    name: {
        color: '#fff',
        fontSize: 16,
    },
    rightContainer: {
        width: 35,
        height: 35,
    },
    backBtn: {
        width: 35,
        height: 35,
    }
})
