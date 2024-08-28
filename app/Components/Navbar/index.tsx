import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './Navbar.style'
import { useStorageData } from '../../hooks/useStorageData'

const Navbar = () => {

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