import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './MessageView.style'
import Avatar from '../Avatar'

interface MessageViewProps {
    usersId: string[]
    name: string
    picture: string
    myId: string
}

const MessageView = ({
    usersId,
    name,
    picture,
    myId
}: MessageViewProps) => {

    usersId = usersId.filter((id) => id !== myId)

    return (
        <View style={styles.container}>
            {usersId.map((id) => (
                <Avatar picture={picture} username={name} key={id} width={25} fontSize={15} />
            ))}
        </View>
    )
}

export default MessageView