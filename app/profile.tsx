import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as StyleConst from './constantes/stylesConst'
import ModalIndicator from './Components/ModalIndicator'
import { BlurView } from 'expo-blur';
import Avatar from './Components/Avatar';
import { useLocalSearchParams } from 'expo-router';

const Profile = () => {

    const params = useLocalSearchParams()
    const { username } = params

    return (
        <BlurView
            style={styles.container}
            intensity={30}
            tint="dark"
        >
            <ModalIndicator />
            <Avatar picture='' username={username as string} width={60} />
        </BlurView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderTopLeftRadius: StyleConst.BorderRadius,
        borderTopRightRadius: StyleConst.BorderRadius,
    },
})