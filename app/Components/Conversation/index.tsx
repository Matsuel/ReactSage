import React from 'react'
import { styles } from './Conversation.style'
import { Text, TouchableOpacity, View } from 'react-native'
import { ConversationInterfaceComponent } from '../../../server/type'
import * as StyleConst from '../../constantes/stylesConst'
import Avatar from '../Avatar'

const ConversationComponent = ({
    usersId,
    lastMessage,
    lastMessageDate,
    lastMessageAuthorId,
    lastMessageId,
    name,
    pinnedBy,
    isGroup,
    createdAt,
    picture,
}: ConversationInterfaceComponent) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Avatar picture={picture} username={name} />
            <Text style={{ color: StyleConst.TextColor }}>{name}</Text>
        </TouchableOpacity>
    )
}

export default ConversationComponent