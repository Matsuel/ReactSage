import React from 'react'
import styles from './ProfileButton.style'
import { Text, TouchableOpacity } from 'react-native'

export interface ProfileData {
    text: string,
    icon: React.ReactNode,
}

const ProfileButton = ({
    text,
    icon,
}: ProfileData) => {
    return (
        <TouchableOpacity style={styles.profileTab} key={"deconnexion"}>
            {icon}
            <Text style={styles.profileTabText}>{text}</Text>
        </TouchableOpacity>
    )
}

export default ProfileButton