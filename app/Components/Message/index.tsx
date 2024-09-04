import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './Message.style'
import { MessageInterfaceComponent } from '../../../server/type'
import MessageView from '../MessageView'

interface MessageProps extends MessageInterfaceComponent {
    myId: string
    authorName: string
}

const Message = ({
    _id,
    content,
    myId,
    authorId,
    date,
    viewedBy,
    authorName
}: MessageProps) => {
    return (
        <View style={styles.wrapper}>
            <View style={[styles.message, authorId === myId ? styles.isMine : styles.isNotMine]}>
                <Text style={{ color: authorId === myId ? '#fff' : '#000' }}>{content}</Text>
            </View>
            <MessageView usersId={viewedBy} name={authorName} picture='' myId={myId} />
        </View>
    )
}

export default Message