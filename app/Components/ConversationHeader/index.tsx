import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './ConversationHeader.style'
import Avatar from '../Avatar';
import LeftArrow from '../../assets/LeftArrow';
import { useRouter } from 'expo-router';
import Button from '../Button';

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

    return (
        <View style={styles.container}>
            <View style={styles.indicator} />
            <TouchableOpacity style={styles.infosContainer} onPress={() => router.push({ pathname: "conversationInfos", params: { conversationId, id, picture, name } })}>
                <Avatar picture={picture} username={name} />
            </TouchableOpacity>
        </View>
    )
}

export default ConversationHeader