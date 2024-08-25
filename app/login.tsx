import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Button from './Components/Button'
import { router, useLocalSearchParams } from 'expo-router'
import LeftArrow from './assets/LeftArrow'
import { StatusBar } from 'expo-status-bar'

const Login = () => {
    const [phone, setPhone] = useState<string>("")
    const params = useLocalSearchParams()
    const { type } = params;

    const generateOtpCode = () => {
        const code = Math.floor(100000 + Math.random() * 900000)
        return code
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Text style={styles.title}>
                Quel est votre numéro de téléphone ?
            </Text>
            <View style={styles.inputsContainer}>
                <TouchableOpacity style={styles.countryBtn}>
                    <Text style={styles.countryTextBtn}>+33</Text>
                </TouchableOpacity>
                <TextInput onChangeText={(e) => setPhone(e)} style={styles.inputText} placeholder='0123 456789' placeholderTextColor="#2e2f30" keyboardType='number-pad' maxLength={10} autoFocus />
            </View>
            <View style={styles.nextViewBtn}>
                <Button icon={<LeftArrow color='#fff' />} onPress={() => router.replace('/')} />
                <Button onPress={() => router.push({ pathname: "/otp", params: { phone: phone, otp: generateOtpCode(), type: type } })} content='Suivant' disabled={phone.length < 10} />
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingLeft: "5%",
        paddingRight: "5%",
        backgroundColor: '#0f0f0f',
        alignItems: 'center',
        borderColor: "#fff",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 70,
        color: "#fff",
        alignSelf: "flex-start",
    },
    inputsContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30,
    },
    countryBtn: {
        width: 70,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    countryTextBtn: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
    },
    inputText: {
        width: "100%",
        height: 40,
        color: "#fff",
        fontSize: 26,
        fontWeight: "bold",
        paddingLeft: 10,
    },
    nextViewBtn: {
        marginTop: 50,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});