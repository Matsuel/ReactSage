import { StyleSheet } from "react-native";
import * as StyleConst from "../../constantes/stylesConst";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: "#0f0f0f",
        alignItems: "center",
        padding: 10,
        paddingLeft: 20,
        borderRadius: StyleConst.BorderRadius,
        gap: 25,
        marginBottom: 10,
    },
    userInfo: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    username: {
        color: StyleConst.TextColor,
        fontSize: 20,
    },
    phone: {
        color: "#8f8e93",
        fontSize: 15,
    },
});