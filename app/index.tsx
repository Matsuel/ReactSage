import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
import { getSecureData } from './utils/getData'
import { deleteSecureData } from './utils/deleteData'
import Button from './Components/Button'
import Home from './homepage'

const Index = () => {

  const router = useRouter()

  useEffect(() => {
    const fetchDatas = async () => {
      const login = await getSecureData('login')
      setTimeout(() => {
        if (login === "true") {
          router.push('homepage')
        } else {
          router.push('welcome')
        }
      }, 5)
    }
    fetchDatas()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>LOGOGOGOGOGO</Text>
      <Button content="Go to welcome" onPress={() => router.push('welcome')} />
      <ActivityIndicator size={"large"} color="#fff" />
    </View>
    // <Home />
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingLeft: "5%",
    paddingRight: "5%",
    backgroundColor: '#0f0f0f',
    alignItems: 'center',
    justifyContent: "center",
    gap: 100
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#fff",
  },
});