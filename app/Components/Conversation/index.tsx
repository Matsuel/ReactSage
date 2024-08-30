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
            <View style={styles.conversationInfo}>
                <Text style={styles.username}>{name}</Text>
                <Text style={styles.lastMessage}>{lastMessage !== undefined ? lastMessage : 'Pas encore de message'}</Text>
            </View>
            <Text style={styles.messageDate}>{lastMessageDate !== undefined ? formatDate(lastMessageDate) : formatDate(createdAt)}</Text>
        </TouchableOpacity>
    )
}

export default ConversationComponent