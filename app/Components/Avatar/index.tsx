import React from 'react'
import { Image, Text, View } from 'react-native'
import { styles } from './Avatar.style'

interface AvatarProps {
    width?: number
    picture: string
    username: string
    fontSize?: number
}

const Avatar = ({
    width = 35,
    fontSize = 20,
    picture,
    username
}: AvatarProps) => {
    return (
        <View style={[styles.container, { width: width, height: width }]}>
            {picture ? <Image
                source={{ uri: `data:image/jpeg;base64,${picture}` }}
                style={styles.avatar}
            /> :
                <Text style={[styles.username, { fontSize: fontSize }]}>
                    {username.charAt(0)}
                </Text>}
        </View>
    )
}

export default Avatar