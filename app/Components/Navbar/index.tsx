import React, { useEffect } from 'react'
import { Text, TouchableOpacity, View, ActionSheetIOS } from 'react-native'
import { styles } from './Navbar.style'
import { useStorageData } from '../../hooks/useStorageData'
import More from '../../assets/More'
import NewConversation from '../../assets/NewConversation'

const Navbar = () => {

    const { data } = useStorageData('username')
    const usernameFirstLetter = data ? data.charAt(0) : ''

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.accountBtn}>
                <Text style={styles.accountText}>{usernameFirstLetter}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.searchBtn}>
                <Text style={styles.searchText}>Rechercher</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.accountBtn}>
                <NewConversation color='#fff' />
            </TouchableOpacity>

        </View>
    )
}

export default Navbar