import React from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

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
        color: "#fff",
        borderRadius: 12,
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
    },
})