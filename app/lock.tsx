import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as Haptics from 'expo-haptics'
import * as LocalAuthentication from 'expo-local-authentication'
import FaceId from './assets/FaceId'
import BackSpace from './assets/BackSpace'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated'

const inactive = () => {
  const [code, setCode] = useState<number[]>([])
  const codeLength = Array(6).fill(0)
  const router = useRouter()

  const onNumberPress = (number: number) => {
    if (code.length < 6) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setCode([...code, number])
    }
  }

  const onBackSpace = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setCode(code.slice(0, -1))
  }

  const offset = useSharedValue(0)
  const styleToApply = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }]
    }
  })

  const onBiometricPress = async () => {
    const { success } = await LocalAuthentication.authenticateAsync()
    if (success) {
      router.push('home')
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    }
  }

  const OFFSET = 20;
  const TIME = 80;

  useEffect(() => {
    if (code.length === 6) {
      if (code.join('') === '123456') {
        setCode([])
        router.push('home')
      } else {
        offset.value = withSequence(
          withTiming(-OFFSET, { duration: TIME / 2 }),
          withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
          withTiming(0, { duration: TIME / 2 })
        )
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        setCode([])
      }

    }
  }, [code])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bienvenue, Matsuel</Text>

      <Animated.View style={[styles.viewCode, styleToApply]}>
        {codeLength.map((_, index) => (
          <View
            key={index}
            style={[styles.codeEmpty, { backgroundColor: code[index] ? "#fff" : "#202020" }]}
          />
        ))}
      </Animated.View>

      <View style={styles.numbers}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          {[1, 2, 3].map((number) => (
            <TouchableOpacity onPress={() => onNumberPress(number)} style={styles.buttonNumber}>
              <Text key={number} style={styles.number}>
                {number}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          {[4, 5, 6].map((number) => (
            <TouchableOpacity onPress={() => onNumberPress(number)} style={styles.buttonNumber}>
              <Text key={number} style={styles.number}>
                {number}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          {[7, 8, 9].map((number) => (
            <TouchableOpacity onPress={() => onNumberPress(number)} style={styles.buttonNumber}>
              <Text key={number} style={styles.number}>
                {number}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
          <TouchableOpacity onPress={onBiometricPress} key={"biometric"} style={styles.buttonNumber}>
            <FaceId />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNumberPress(0)} key={0} style={styles.buttonNumber}>
            <Text key={0} style={styles.number}>
              {0}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onBackSpace} key={"backspace"} style={[styles.buttonNumber]}>
            {code.length > 0 && <BackSpace />}
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  )
}

export default inactive

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingLeft: "5%",
    backgroundColor: '#000',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 100,
    color: "#fff",
  },
  viewCode: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginVertical: 100,
  },
  codeEmpty: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  numbers: {
    width: "100%",
    marginHorizontal: 80,
    gap: 60,
  },
  buttonNumber: {
    width: 30,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },
});