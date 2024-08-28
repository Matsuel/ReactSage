import React from 'react'
import { styles } from './Conversation.style'
import { Text, View } from 'react-native'
import { ConversationInterfaceComponent } from '../../../server/type'

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
}:ConversationInterfaceComponent) => {
    return (
        <View style={styles.container}>
            <Text style={{color: "#fff"}}>{name}</Text>
        </View>
    )
}

export default ConversationComponent