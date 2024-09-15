import React from 'react'
import styles from './ProfileButton.style'
import { Text, TouchableOpacity } from 'react-native'
import { emitAndListenEvent } from '../../utils/events'
import { deleteSecureData } from '../../utils/deleteData'
import { router, useNavigation } from 'expo-router'

export interface ProfileData {
    text: string,
    icon: React.ReactNode,
    onPress?: () => void,
}

const ProfileButton = ({
    text,
    icon,
    onPress
}: ProfileData) => {

    const onPressFunction = async () => {
        if (onPress) {
            onPress()
        } 
    }

    return (
        <TouchableOpacity style={styles.profileTab} key={text} onPress={onPressFunction}>
            {icon}
            <Text style={styles.profileTabText}>{text}</Text>
        </TouchableOpacity>
    )
}

export default ProfileButton