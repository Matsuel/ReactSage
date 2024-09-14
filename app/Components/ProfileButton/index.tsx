import React from 'react'
import styles from './ProfileButton.style'
import { Text, TouchableOpacity } from 'react-native'

export interface ProfileData {
    text: string,
    icon: React.ReactNode,
    onPress?: () => void,
}

const ProfileButton = ({
    text,
    icon,
    onPress,
}: ProfileData) => {

    console.log('ProfileButton', text)
    console.log(onPress);
    ;
    

    return (
        <TouchableOpacity style={styles.profileTab} key={text} onPress={onPress}>
            {icon}
            <Text style={styles.profileTabText}>{text}</Text>
        </TouchableOpacity>
    )
}

export default ProfileButton