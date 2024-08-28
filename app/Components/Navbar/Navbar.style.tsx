import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 40,
        backgroundColor: "transparent",
        marginTop: 55,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    accountBtn: {
        width: 40,
        height: 40,
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
    searchBtn: {
        width: "72%",
        height: 40,
        borderRadius: 20,
        backgroundColor: "#8f8e93",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 20,
    },
    searchText: {
        color: "#fff",
        fontSize: 16,
    },
});