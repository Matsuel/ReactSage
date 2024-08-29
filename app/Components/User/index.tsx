import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
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
        <TouchableOpacity style={styles.container} disabled={_id === ""}>
            <Avatar picture={picture} username={username} />
            <View style={styles.userInfo}>
                <Text style={styles.username}>{username}</Text>
                {phone && <Text style={styles.phone}>{phone}</Text>}
            </View>
        </TouchableOpacity>
    )
}

export default UserComponent