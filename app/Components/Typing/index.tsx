import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { styles } from './Typing.style';
import Avatar from '../Avatar';
import { useAnimateBubble } from './AnimateBubble';

interface TypingProps {
    picture: string;
    username: string[];
}

const Typing = ({
    picture,
    username
}: TypingProps) => {
    if (username === undefined) return null;
    if (username.length === 0) return null;

    const translateY1 = useRef(new Animated.Value(0)).current;
    const translateY2 = useRef(new Animated.Value(0)).current;
    const translateY3 = useRef(new Animated.Value(0)).current;

    useAnimateBubble(translateY1, translateY2, translateY3);

    return (
        <View style={styles.container}>
            {username !== undefined && username.map((name) => (
                <Avatar picture={picture} username={name} key={name} width={25} fontSize={15} />
            ))}
            <View style={styles.bubblesContainer}>
                <Animated.View style={[styles.bubble, { transform: [{ translateY: translateY1 }] }]} />
                <Animated.View style={[styles.bubble, { transform: [{ translateY: translateY2 }] }]} />
                <Animated.View style={[styles.bubble, { transform: [{ translateY: translateY3 }] }]} />
            </View>
        </View>
    );
};

export default Typing;
