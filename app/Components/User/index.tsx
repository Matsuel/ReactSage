import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './User.style'
import { UserInterfaceComponent } from '../../../server/type'
import Avatar from '../Avatar'

const UserComponent = ({
    picture,
    phone,
    username,
    _id
}: UserInterfaceComponent) => {
    return (
        <View style={styles.container}>
            <Avatar picture={picture} username={username} />
            <View style={styles.userInfo}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.phone}>{phone}</Text>
            </View>
        </View>
    )
}

export default UserComponent