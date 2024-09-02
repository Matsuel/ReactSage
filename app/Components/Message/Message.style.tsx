import { StyleSheet } from "react-native";
import * as StyleConst from '../../constantes/stylesConst';

export const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
    },
    isMine: {
        alignSelf: 'flex-end',
        backgroundColor: '#007AFF',
    },
    isNotMine: {
        alignSelf: 'flex-start',
        backgroundColor: '#f4f4f4',
    },
    message: {
        padding: 10,
        margin: 5,
        borderRadius: StyleConst.BorderRadius,
    },
});