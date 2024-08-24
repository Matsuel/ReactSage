import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { socket } from './_layout'

const Home = () => {

    useEffect(() => {
        socket.emit('test', 'test')
        socket.on('test', (data) => {
            console.log(data)
        })
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