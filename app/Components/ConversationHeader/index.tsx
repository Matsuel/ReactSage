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
}

const ConversationHeader = ({
    picture,
    name
}: ConversationHeaderProps) => {

    const router = useRouter()

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                <LeftArrow color='#fff' width={25} stroke={2} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.infosContainer}>
                <Avatar picture={picture} username={name} width={40} />
                <Text style={styles.name}>{name}</Text>
            </TouchableOpacity>
            <View style={styles.rightContainer} />
        </View>
    )
}

export default ConversationHeader