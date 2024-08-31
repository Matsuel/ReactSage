import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as StyleConst from './constantes/stylesConst'
import ModalIndicator from './Components/ModalIndicator'

const Profile = () => {
    return (
        <View style={styles.container}>
            <ModalIndicator />
            <Text>Profile</Text>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: StyleConst.ModalBackgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderTopLeftRadius: StyleConst.BorderRadius,
        borderTopRightRadius: StyleConst.BorderRadius,
    },
})