import { useEffect } from "react";
import { Animated } from "react-native";

export const useAnimateBubble = (
  translateY1: Animated.Value,
  translateY2: Animated.Value,
  translateY3: Animated.Value
) => {
  
  const duration = 300;

  useEffect(() => {
    const animateBubble = (animatedValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animatedValue, {
            toValue: -5,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.delay(500 - delay),
        ])
      );
    };

    const animation1 = animateBubble(translateY1, 0);
    const animation2 = animateBubble(translateY2, 150);
    const animation3 = animateBubble(translateY3, 300);

    animation1.start();
    animation2.start();
    animation3.start();

    return () => {
      animation1.stop();
      animation2.stop();
      animation3.stop();
    };
  }, [translateY1, translateY2, translateY3]);
};