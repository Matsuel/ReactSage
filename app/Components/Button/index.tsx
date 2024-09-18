import React, { useRef } from 'react'
import { Animated, Text, Pressable, PressableProps } from 'react-native'
import * as Haptics from 'expo-haptics';
import RightArrow from '../../assets/RightArrow';
import { styles } from './Button.style';
import { useHaptics } from '../../providers/hapticsProvider';

interface ButtonProps extends PressableProps {
    variant?: 'default' | 'primary' | 'light' | 'disabled' | 'transparentLight' | 'transparentDark'
    content?: string
    icon?: React.ReactNode
    onPress?: () => void
}

const Button = ({
    variant = 'default',
    content,
    onPress,
    icon,
    ...props
}: ButtonProps) => {

    const hapticsEnabled = useHaptics()

    if (props.disabled && props.disabled === true) {
        variant = 'disabled'
    }

    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        if (hapticsEnabled === 'true') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

        Animated.sequence([
            Animated.spring(scaleAnim, {
                toValue: 0.9,
                speed: 160,
                bounciness: 12,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                bounciness: 8,
                useNativeDriver: true,
            }),

        ]).start();
        if (onPress) onPress();
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Pressable
                onPress={handlePress}
                style={[styles.btnContainer, styles[variant]]} {...props}
            >
                {content &&
                    <Text style={[styles.text, styles[variant]]}>{content}</Text>
                }
                {icon ? icon : <RightArrow {...props} color={styles[variant].color} />}
            </Pressable>
        </Animated.View>
    )
}

export default Button