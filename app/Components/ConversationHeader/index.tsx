import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { styles } from './ConversationHeader.style'
import Avatar from '../Avatar';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

interface ConversationHeaderProps {
    picture: string;
    name: string;
    id: string;
    conversationId: string;
}

const ConversationHeader = ({
    picture,
    name,
    conversationId,
    id
}: ConversationHeaderProps) => {

    const router = useRouter()

    const goToInfos = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        router.push({ pathname: "conversationInfos", params: { conversationId, id, picture, name } })
    }

    return (
        <View style={styles.container}>
            <View style={styles.indicator} />
            <TouchableOpacity style={styles.infosContainer} onPress={goToInfos}>
                <Avatar picture={picture} username={name} />
            </TouchableOpacity>
        </View>
    )
}

export default ConversationHeader