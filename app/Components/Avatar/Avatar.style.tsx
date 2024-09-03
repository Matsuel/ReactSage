import { StyleSheet } from "react-native";
import * as StyleConst from "../../constantes/stylesConst";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#8f8e93",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
    },
    avatar: {
        width: "100%",
        height: "100%",
    },
    username: {
        color: StyleConst.TextColor,
    },
});