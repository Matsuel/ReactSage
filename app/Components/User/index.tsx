import React, { useEffect } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { styles } from './User.style'
import { UserInterfaceComponent } from '../../../server/type'
import Avatar from '../Avatar'
import { emitEvent, listenEvent } from '../../utils/events'
import { useStorageData } from '../../hooks/useStorageData'
import { useRouter } from 'expo-router'

const UserComponent = ({
    picture,
    phone,
    username,
    _id
}: UserInterfaceComponent) => {

    const router = useRouter()

    const { data: id } = useStorageData('id')
    console.log(id);

    useEffect(() => {
        listenEvent('createConversation', (data) => {
            if (data.success && router.canGoBack()) {
                router.back()        
            }
        })
    }, [])


    const createconversation = () => {
        emitEvent('createConversation', { otherId: _id, id })
    }

    return (
        <TouchableOpacity style={styles.container} disabled={_id === ""} onPress={createconversation}>
            <Avatar picture={picture} username={username} />
            <View style={styles.userInfo}>
                <Text style={styles.username}>{username}</Text>
                {phone && <Text style={styles.phone}>{phone}</Text>}
            </View>
        </TouchableOpacity>
    )
}

export default UserComponent