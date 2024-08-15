import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from './Components/Button'
import Input from './Components/Input'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'

const Index = () => {

  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button content="Test" onPress={() => router.push('lock')} variant='light' />
      <Input />
      <StatusBar style="auto" />
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingLeft: "5%",
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});