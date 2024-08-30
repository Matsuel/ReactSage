import React from 'react'
import { Text, View, ViewProps } from 'react-native'
import { styles } from './Title.style'

interface TitleProps {
    title: string
}

const Title = ({
    title
}: TitleProps) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

export default Title