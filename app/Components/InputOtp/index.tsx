import React from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'
import * as StyleConst from '../../constantes/stylesConst'

interface Props extends TextInputProps {
}

const InputOtp = React.forwardRef<TextInput, Props>((props, ref) => {
    return (
        <TextInput
            style={styles.otp}
            ref={ref}
            {...props}
        />
    )
})

export default InputOtp

const styles = StyleSheet.create({
    otp: {
        width: 50,
        height: 50,
        backgroundColor: "#202020",
        color: StyleConst.TextColor,
        borderRadius: StyleConst.BorderRadius,
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
    },
})