import React from 'react'
import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import Navbar from './Components/Navbar'
import { StatusBar } from 'expo-status-bar'

const Home = () => {

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Navbar />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingLeft: "5%",
        paddingRight: "5%",
        backgroundColor: '#0f0f0f',
        alignItems: 'center',
        justifyContent: "flex-start"
    },
})