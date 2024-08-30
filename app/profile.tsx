import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Profile = () => {
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        // opacity: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
    },
})