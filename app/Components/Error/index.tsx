import React, { useEffect, useState } from 'react'
import { Text, View, Animated, StyleSheet } from 'react-native'

interface Props {
    error: string
    duration?: number
}

const ErrorComponent = ({
    error,
    duration = 3000
}: Props) => {
    const [visible, setVisible] = useState(true)
    const fadeAnim = new Animated.Value(1)

    useEffect(() => {
        const timer = setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => setVisible(false))
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, fadeAnim])

    // if (!visible) return null

    return (
        <View style={style.container}>
            {visible && < Animated.Text style={[style.error, { opacity: fadeAnim }]}>{error}</Animated.Text>}
        </View >
    )
}

export default ErrorComponent

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    error: {
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold',
    }
})