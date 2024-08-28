import React from 'react'
import { Image, Text, View } from 'react-native'
import { styles } from './Avatar.style'

interface AvatarProps {
    width?: number
    picture: string
    username: string
}

const Avatar = ({
    width = 35,
    picture,
    username
}: AvatarProps) => {
    return (
        <View style={[styles.container, { width: width, height: width }]}>
            {picture ? <Image
                source={{ uri: `data:image/jpeg;base64,${picture}` }}
                style={styles.avatar}
            />:
            <Text style={styles.username}>{username.charAt(0)}</Text>}
        </View>
    )
}

export default Avatar