import { StyleSheet } from "react-native";
import * as StyleConst from "../../constantes/stylesConst";

const styles = StyleSheet.create({
    profileTab: {
        width: '100%',
        height: "auto",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 20,
        padding: 12,
    },
    profileTabText: {
        color: StyleConst.TextColor,
        fontSize: 20,
    }
})

export default styles;