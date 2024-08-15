import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Login = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Login
            </Text>
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
        backgroundColor: '#000',
        alignItems: 'center',
        borderColor: "#fff",
        
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 100,
        color: "#fff",
        alignSelf: "flex-start",
        marginLeft: "10%"
      },
});