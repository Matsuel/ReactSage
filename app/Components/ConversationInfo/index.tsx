import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './ConversationInfo.style';

interface ConversationInfoProps {
    title: string;
    data?: string;
    dataComponent?: React.ReactNode;
}

const ConversationInfo = ({
    data,
    title,
    dataComponent
}:ConversationInfoProps) => {
    return (
        <View style={styles.infos}>
            <Text style={styles.text}>{title}</Text>
            {dataComponent}
            {data && <Text style={styles.text}>{data}</Text>}
        </View>
    )
}

export default ConversationInfo

