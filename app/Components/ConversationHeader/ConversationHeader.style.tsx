import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: "auto",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    middleContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    indicator: {
        width: 40,
        height: 5,
        backgroundColor: '#888',
        borderRadius: 2.5,
        marginTop: 10,
        marginBottom: 10,
    },
    infosContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    backBtn: {
        width: 35,
        height: 35,
    }
})
