import React from 'react'
import { styles } from './Conversation.style'
import { Text, TouchableOpacity, View } from 'react-native'
import { ConversationInterfaceComponent } from '../../../server/type'
import * as StyleConst from '../../constantes/stylesConst'
import Avatar from '../Avatar'
import { useRouter } from 'expo-router'
import { formatDate } from '../../utils/formatDate'

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
    _id,
}: ConversationInterfaceComponent) => {

    const router = useRouter()

    return (
        <TouchableOpacity style={styles.container} onPress={() => router.push({ pathname: 'activeConversation', params: { id: _id } })}>
            <Avatar picture={picture} username={name} width={40} />
            <Text style={{ color: StyleConst.TextColor }}>{name}</Text>
            <Text style={{ color: StyleConst.TextColor }}>{lastMessageDate !== undefined ? formatDate(lastMessageDate) : formatDate(createdAt)}</Text>
        </TouchableOpacity>
    )
}

export default ConversationComponent