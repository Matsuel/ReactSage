import React, { useRef, useState } from 'react'
import { NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputChangeEventData, TextInputKeyPressEventData, View } from 'react-native'
import Button from './Components/Button'
import LeftArrow from './assets/LeftArrow'
import { router, useLocalSearchParams } from 'expo-router'

const Otp = () => {

    const params = useLocalSearchParams()
    const { phone } = params

    const [code, setCode] = useState<string[]>(Array(6).fill(""))
    const inputRefs = Array(6).fill(0).map(() => useRef<TextInput>(null))

    const handleCode = (index: number) => (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        const newCode = [...code]

        if (e.nativeEvent.key === 'Backspace') {
            newCode[index] = ""
            setCode(newCode)
            focusPrev(index)
        } else if (/^\d$/.test(e.nativeEvent.key)) {
            newCode[index] = e.nativeEvent.key
            setCode(newCode)
            focusNext(index)
        }
    }

    const focusNext = (index: number) => {
        if (index < 5) {
            inputRefs[index + 1].current?.focus()
        }
    }

    const focusPrev = (index: number) => {
        if (index > 0) {
            inputRefs[index - 1].current?.focus()
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Entrez le code de vérification
            </Text>

            <View style={styles.codeInputs}>
                {inputRefs.map((ref, i) => (
                    <TextInput
                        key={i}
                        style={styles.input}
                        onKeyPress={handleCode(i)}
                        keyboardType='phone-pad'
                        maxLength={1}
                        ref={ref}
                        value={code[i]}
                        autoFocus={i === 0}
                    />
                ))}
            </View>

            <View style={styles.nextViewBtn}>
                <Button icon={<LeftArrow color='#fff' />} onPress={() => router.replace('/')} />
                <Button onPress={() => router.push({ pathname: "/lock" })} content='Suivant' disabled={!code.every(char => char !== "")} />
            </View>
        </View>
    )
}

export default Otp

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingLeft: "5%",
        paddingRight: "5%",
        backgroundColor: '#0f0f0f',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 70,
        color: "#fff",
        alignSelf: "flex-start",
    },
    codeInputs: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
    },
    input: {
        width: 50,
        height: 50,
        backgroundColor: "#202020",
        color: "#fff",
        borderRadius: 12,
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
    },
    nextViewBtn: {
        marginTop: 50,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
})