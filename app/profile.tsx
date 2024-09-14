import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as StyleConst from './constantes/stylesConst'
import ModalIndicator from './Components/ModalIndicator'
import { BlurView } from 'expo-blur';
import Avatar from './Components/Avatar';
import { useLocalSearchParams } from 'expo-router';
import { profileDatas } from './constantes/profile';
import ProfileButton from './Components/ProfileButton';

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
            <Avatar picture='' username={username as string} width={65} />
            <Text style={styles.username}>{username}</Text>
            <View style={styles.profilePart}>
                {profileDatas["1"].map((data, index) => (
                    <ProfileButton key={index} text={data.text} icon={data.icon} />
                ))}
            </View>

            <View style={styles.profilePart}>
                {profileDatas["2"].map((data, index) => (
                    <ProfileButton key={index} text={data.text} icon={data.icon} onPress={data.onPress} />
                ))}
            </View>
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
        gap: 20,
        paddingLeft: "5%",
        paddingRight: "5%",
    },
    username: {
        color: StyleConst.TextColor,
        fontSize: 24,
        fontWeight: 'bold',
    },
    profilePart: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: "5%",
        backgroundColor: "rgba(15, 15, 15, 0.5)",
        borderRadius: StyleConst.BorderRadius,
    },

})