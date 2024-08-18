import React, { useEffect, useRef, useState } from 'react'
import { NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputKeyPressEventData, View } from 'react-native'
import Button from './Components/Button'
import LeftArrow from './assets/LeftArrow'
import { router, useLocalSearchParams } from 'expo-router'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'
import ErrorComponent from './Components/Error'
import { StatusBar } from 'expo-status-bar'
import * as SecureStore from 'expo-secure-store'

const Otp = () => {

    const params = useLocalSearchParams()
    const { phone, otp } = params
    console.log(params);

    const storeSecureData = async (key: any, value: any) => {
        try {
            await SecureStore.setItemAsync(key, value);
            console.log('Data stored securely');
        } catch (error) {
            console.error('Error storing secure data', error);
        }
    };


    const [code, setCode] = useState<string[]>(Array(6).fill(""))
    const [errorString, setErrorString] = useState<string>("")
    const inputRefs = Array(6).fill(0).map(() => useRef<TextInput>(null))

    const isCompleteCode = code.every(char => char !== "")

    const handleCode = (index: number) => (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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

    const offset = useSharedValue(0)
    const styleToApply = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: offset.value }]
        }
    })

    const OFFSET = 20;
    const TIME = 80;

    useEffect(() => {
        if (isCompleteCode) {
            if (code.join('') === otp) {
                storeSecureData('phone', phone)
                storeSecureData('login', "true")
                router.push('/lock')
            } else {
                setErrorString("Le code saisi est incorrect")
                offset.value = withSequence(
                    withTiming(-OFFSET, { duration: TIME / 2 }),
                    withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
                    withTiming(0, { duration: TIME / 2 })
                )
                setCode(Array(6).fill(""))
                inputRefs[0].current?.focus()
            }
        }
    }, [code])


    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <Text style={styles.title}>
                Entrez le code de vérification
            </Text>

            <Animated.View style={[styles.codeInputs, styleToApply]}>
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
            </Animated.View>

            <ErrorComponent error={errorString} />

            <View style={styles.nextViewBtn}>
                <Button icon={<LeftArrow color='#fff' />} onPress={() => router.back()} />
                <Button onPress={() => router.push({ pathname: "/lock" })} content='Suivant' disabled={!isCompleteCode} />
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
        marginTop: 10,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
})