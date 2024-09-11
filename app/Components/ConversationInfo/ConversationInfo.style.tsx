import { StyleSheet } from 'react-native';
import * as StyleConst from '../../constantes/stylesConst';

export const styles = StyleSheet.create({
    infos: {
        width: '100%',
        height: "auto",
        flexDirection: "row",
        backgroundColor: StyleConst.InfoBackgroundColor,
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        paddingLeft: 15,
        paddingRight: 25,
        borderRadius: StyleConst.BorderRadius,
    },
    text: {
        fontSize: 16,
        color: StyleConst.TextColor,
        marginLeft: 10,
    }
})