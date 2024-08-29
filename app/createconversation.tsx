import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { socket } from './_layout'
import { debounce } from 'lodash'
import { UserInterfaceComponent } from '../server/type'
import UserComponent from './Components/User'
import * as StyleConst from './constantes/stylesConst'
import ModalIndicator from './Components/ModalIndicator'
import { MoreCharacters, NoResults } from './constantes/UserConstants'

const createconversation = () => {

  const params = useLocalSearchParams()
  const { id } = params
  const [users, setUsers] = useState<UserInterfaceComponent[]>([MoreCharacters])
  const [searchValue, setSearchValue] = useState<string>('')


  const router = useRouter()

  socket.on('searchUsers', (data) => {
    if (data.success) {
      if (data.users.length === 0) {
        setUsers([NoResults])
      } else {
        setUsers(data.users)
      }
    }
  })


  const goBack = () => {
    if (router.canGoBack()) {
      router.back()
    }
  }

  const search = useCallback(debounce((text: string) => {
    if (text.trim().length >= 3) {
      socket.emit('searchUsers', { id, search: text })
    } else if (text.trim().length < 3) {
      setUsers([MoreCharacters])
    }
  }, 1000), [])

  return (
    <View style={styles.container}>
      <ModalIndicator />
      <View style={styles.top}>
        <TextInput style={styles.inputSearch}
          placeholder="Rechercher ici par nom ou téléphone"
          placeholderTextColor={"#757575"}
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
    height: '75%',
    maxHeight: '75%',
    paddingLeft: "5%",
    paddingRight: "5%",
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: "flex-start",
    borderTopRightRadius: StyleConst.BorderRadius,
    borderTopLeftRadius: StyleConst.BorderRadius,
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
    backgroundColor: '#2e2f31',
    color: '#757575',
    paddingLeft: 15,
    borderRadius: StyleConst.BorderRadius,
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
    marginTop: 25,
    position: 'relative',
  },
})