import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { styles } from './Navbar.style'
import { useStorageData } from '../../hooks/useStorageData'
import Avatar from '../Avatar'
import NewConversation from '../../assets/NewConversation'
import { useRouter } from 'expo-router'
import * as Haptics from 'expo-haptics'

const Navbar = () => {

    const router = useRouter()

    const { data: username } = useStorageData('username')
    const usernameFirstLetter = username ? username.charAt(0) : ''

    const { data: userId } = useStorageData('id')

    const goToProfile = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        router.push({ pathname: "/profile", params: { username, id: userId } })
    }

    const goToCreateConversation = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        router.push({ pathname: "/createconversation", params: { id: userId } })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goToProfile}>
                <Avatar picture='' username={usernameFirstLetter as string} width={35} />
            </TouchableOpacity>
            <TouchableOpacity onPress={goToCreateConversation}>
                <NewConversation color='#fff' width={30} />
            </TouchableOpacity>
        </View>
    )
}

export default Navbar