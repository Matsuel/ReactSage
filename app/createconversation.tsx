import { useRouter } from 'expo-router'
import React, { useCallback } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { socket } from './_layout'
import { debounce } from 'lodash'

const createconversation = () => {

  const router = useRouter()

  const goBack = () => {
    if (router.canGoBack()) {
      router.back()
    }
  }

  const search = useCallback(debounce((text:string) => {
    if (text.trim().length > 0) {
      socket.emit('search', text)
    }
  }, 500), [])

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TextInput style={styles.input}
         placeholder="Rechercher ici par nom ou téléphone" 
         placeholderTextColor={"#fff"} 
         onChangeText={search}
         />
        <TouchableOpacity style={styles.searchBtn} onPress={goBack}>
          <Text style={styles.searchText}>Annuler</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default createconversation

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingLeft: "5%",
    paddingRight: "5%",
    backgroundColor: '#0f0f0f',
    alignItems: 'center',
    justifyContent: "flex-start"
  },
  top: {
    width: '100%',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 35,
  },
})