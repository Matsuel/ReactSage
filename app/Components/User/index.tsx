import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './User.style'
import { UserInterfaceComponent } from '../../../server/type'

const UserComponent = ({
    picture,
    phone,
    username,
    _id
}: UserInterfaceComponent) => {
    return (
        <View>
            <Text>user</Text>
        </View>
    )
}

export default UserComponent