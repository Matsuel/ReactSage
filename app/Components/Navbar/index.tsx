import React, { useEffect } from 'react'
import { Text, TouchableOpacity, View, ActionSheetIOS, Image } from 'react-native'
import { styles } from './Navbar.style'
import { useStorageData } from '../../hooks/useStorageData'
import More from '../../assets/More'
import NewConversation from '../../assets/NewConversation'
import { useRouter } from 'expo-router'

const Navbar = () => {

    const router = useRouter()

    const { data: username } = useStorageData('username')
    const usernameFirstLetter = username ? username.charAt(0) : ''

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.accountBtn}>
                <Text style={styles.accountText}>{usernameFirstLetter}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Navbar