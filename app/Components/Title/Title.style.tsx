import { StyleSheet } from "react-native";
import * as StyleConst from "../../constantes/stylesConst";

export const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 15,
    },
    title: {
        color: StyleConst.TextColor,
        fontSize: 32,
        fontWeight: "bold",
    },
});