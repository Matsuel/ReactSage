import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { styles } from './Navbar.style'
import { useStorageData } from '../../hooks/useStorageData'
import Avatar from '../Avatar'
import NewConversation from '../../assets/NewConversation'
import { useRouter } from 'expo-router'

const Navbar = () => {

    const router = useRouter()

    const { data: username } = useStorageData('username')
    const usernameFirstLetter = username ? username.charAt(0) : ''

    const { data: userId } = useStorageData('id')

    return (
        <View style={styles.container}>
            <Avatar picture='' username={usernameFirstLetter as string} width={35} />
            <TouchableOpacity onPress={() => router.push({ pathname: "/createconversation", params: { id: userId } })}>
                <NewConversation color='#fff' width={30} />
            </TouchableOpacity>
        </View>
    )
}

export default Navbar