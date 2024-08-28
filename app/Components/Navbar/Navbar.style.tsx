import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 35,
        marginTop: 55,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    accountBtn: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: "#8f8e93",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    accountText: {
        color: "#fff",
        fontSize: 20,
    },
});