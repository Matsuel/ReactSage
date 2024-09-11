import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as StyleConst from './constantes/stylesConst'
import ModalIndicator from './Components/ModalIndicator'
import { useLocalSearchParams } from 'expo-router'
import Avatar from './Components/Avatar'

const conversationInfos = () => {

  const params = useLocalSearchParams()
  const { conversationId, id, picture, name } = params

  return (
    <View style={styles.container}>
      <ModalIndicator />
      <Avatar picture={picture as string} username={name as string} width={80} fontSize={35} />
      <Text>Conversation Infos</Text>
      <Text>ConversationId: {conversationId}</Text>
      <Text>Id: {id}</Text>
    </View>
  )
}

export default conversationInfos

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingLeft: "5%",
    paddingRight: "5%",
    backgroundColor: StyleConst.BackgroundColor,
    alignItems: 'center',
    justifyContent: "flex-start",
  },
})