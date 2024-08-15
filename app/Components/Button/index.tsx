import React, { useRef } from 'react'
import { Animated, Text, Pressable, PressableProps } from 'react-native'
import * as Haptics from 'expo-haptics';
import RightArrow from '../../assets/RightArrow';
import { useFonts } from 'expo-font';
import { Outfit_700Bold } from '@expo-google-fonts/outfit';
import { styles } from './Button.style';

interface ButtonProps extends PressableProps {
    variant?: 'default' | 'primary' | 'light'
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

    if (props.disabled && props.disabled === true) {
        variant = 'primary'
    }


    const [fontsLoaded] = useFonts({
        Outfit_700Bold,
    });

    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePress = () => {

        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

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
                    <>
                        <Text style={[styles.text, styles[variant]]}>{content}</Text>
                        <RightArrow {...props} color={styles[variant].color} />
                    </>}
                {icon}
            </Pressable>
        </Animated.View>
    )
}

export default Button