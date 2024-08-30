import { StyleSheet } from "react-native";
import * as StyleConst from "../../constantes/stylesConst";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: StyleConst.ModalBackgroundColor,
        alignItems: "center",
        padding: 15,
        paddingLeft: 20,
        borderRadius: StyleConst.BorderRadius,
        gap: 25,
        marginBottom: 10,
    },
});