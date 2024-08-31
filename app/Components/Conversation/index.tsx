import React from 'react'
import { styles } from './Conversation.style'
import { Text, TouchableOpacity, View } from 'react-native'
import * as StyleConst from '../../constantes/stylesConst'
import Avatar from '../Avatar'
import { useRouter } from 'expo-router'
import { formatDate } from '../../utils/formatDate'

interface ConversationComponentProps {
    usersId: string[]
    lastMessage: string
    lastMessageDate: Date
    lastMessageAuthorId: string
    lastMessageId: string
    name: string
    pinnedBy: string[]
    isGroup: boolean
    createdAt: Date
    picture: string
    _id: string
    id: string
}

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
    id
}: ConversationComponentProps) => {

    const router = useRouter()

    return (
        <TouchableOpacity style={styles.container} onPress={() => router.push({ pathname: 'activeConversation', params: { conversationId: _id, picture, name, id } })}>
            <Avatar picture={picture} username={name} width={40} />
            <View style={styles.conversationInfo}>
                <Text style={styles.username}>{name}</Text>
                <Text style={styles.lastMessage}>{lastMessage !== "" ? lastMessage : 'Pas encore de message'}</Text>
            </View>
            <Text style={styles.messageDate}>{lastMessageDate !== null ? formatDate(lastMessageDate) : formatDate(createdAt)}</Text>
        </TouchableOpacity>
    )
}

export default ConversationComponent