import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { socket } from './_layout'
import { debounce } from 'lodash'
import { UserInterface } from '../server/type'
import UserComponent from './Components/User'
import Button from './Components/Button'

const createconversation = () => {

  const params = useLocalSearchParams()
  const { id } = params
  const [users, setUsers] = useState<UserInterface[]>([])
  const [searchValue, setSearchValue] = useState<string>('')


  const router = useRouter()

  socket.on('searchUsers', (data) => {
    if (data.success) {
      setUsers(data.users)
    }
  })


  const goBack = () => {
    if (router.canGoBack()) {
      router.back()
    }
  }

  const search = useCallback(debounce((text: string) => {
    if (text.trim().length > 0) {
      socket.emit('searchUsers', { id, search: text })
    }
  }, 1000), [])

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TextInput style={styles.inputSearch}
          placeholder="Rechercher ici par nom ou téléphone"
          placeholderTextColor={"#fff"}
          onChangeText={search}
          value={searchValue}
          onChange={(e) => setSearchValue(e.nativeEvent.text)}
          autoFocus
        />
        <TouchableOpacity style={styles.searchBtn} onPress={goBack}>
          <Text style={styles.searchText}>Annuler</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.userList}
        data={users}
        renderItem={({ item }) => <UserComponent _id={item._id as string} phone={item.phone} username={item.username} picture={item.picture} />}
      />
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
    backgroundColor: '#000',
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
  inputSearch: {
    width: '75%',
    height: 50,
    backgroundColor: '#202020',
    color: '#fff',
    paddingLeft: 15,
    borderRadius: 12,
  },
  searchBtn: {
    width: '20%',
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  searchText: {
    color: '#fff',
    fontSize: 16,
  },
  userList: {
    width: '100%',
    marginTop: 15,
    position: 'relative',
  },
})