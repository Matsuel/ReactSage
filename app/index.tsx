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
      <StatusBar style="light" />
      <Text style={styles.title}>Bienvenue sur ReactSage</Text>
      <View style={styles.btns}>
        <Button content="Connexion" onPress={() => router.push('logn')} variant='default' />
        <Button content="Connexion" onPress={() => router.push('login')} variant='light' />
      </View>
    </View>
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
    justifyContent: "space-between"
  },
  btns: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 50
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 100,
    color: "#fff",
    alignSelf: "flex-start",
    marginLeft: "10%"
  },
});