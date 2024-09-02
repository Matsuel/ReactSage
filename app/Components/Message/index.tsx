import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './Message.style'
import { MessageInterfaceComponent } from '../../../server/type'

interface MessageProps extends MessageInterfaceComponent {
    myId: string
}

const Message = ({
    _id,
    content,
    myId,
    authorId,
    date,
    viewedBy
}: MessageProps) => {
    return (
        <View style={styles.wrapper}>
            <View style={[styles.message, authorId === myId ? styles.isMine : styles.isNotMine]}>
                <Text style={{ color: authorId === myId ? '#fff' : '#000' }}>{content}</Text>
            </View>
        </View>
    )
}

export default Message