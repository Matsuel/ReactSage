import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Home = () => {

    
    useEffect(() => {
        console.log(process.env.EXPO_PUBLIC_SERVER_IP);
        
        const ws = new WebSocket('ws://' + process.env.EXPO_PUBLIC_SERVER_IP + ':8080')
        ws.onopen = () => {
            console.log('connected')
            ws.send('Hello')
        }

        ws.onmessage = (e) => {
            console.log(e.data)
        }

        ws.onclose = () => {
            console.log('disconnected')
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text style={{ color: "#fff" }}>gros negro</Text>
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
        justifyContent: "center"
    },
})