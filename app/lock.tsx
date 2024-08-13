import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as Haptics from 'expo-haptics'
import FaceId from './assets/FaceId'
import BackSpace from './assets/BackSpace'

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

  const onBiometricPress = () => { }

  useEffect(() => {
    if (code.length === 6) {
      console.log(code);
      console.log(codeLength);

    }
  }, [code])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome back, Matsuel</Text>

      <View style={styles.viewCode}>
        {codeLength.map((_, index) => (
          <View
            key={index}
            style={[styles.codeEmpty, { backgroundColor: code[index] ? "#fff" : "#202020" }]}
          />
        ))}
      </View>

      <View style={styles.numbers}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          {[1, 2, 3].map((number) => (
            <TouchableOpacity onPress={() => onNumberPress(number)}>
              <Text key={number} style={styles.number}>
                {number}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          {[4, 5, 6].map((number) => (
            <TouchableOpacity onPress={() => onNumberPress(number)}>
              <Text key={number} style={styles.number}>
                {number}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          {[7, 8, 9].map((number) => (
            <TouchableOpacity onPress={() => onNumberPress(number)}>
              <Text key={number} style={styles.number}>
                {number}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
          <TouchableOpacity onPress={onBiometricPress}>
            <FaceId />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNumberPress(0)}>
            <Text key={0} style={styles.number}>
              {0}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onBackSpace} style={{ minWidth: 30, minHeight: 30 }}>
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
  number: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },
});