import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ActionSheetIOS } from 'react-native'
import * as StyleConst from './constantes/stylesConst'
import ModalIndicator from './Components/ModalIndicator'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import Avatar from './Components/Avatar'
import ConversationInfo from './Components/ConversationInfo'
import { emitAndListenEvent } from './utils/events'

interface Userinfos {
  picture: string;
  phone: string;
  username: string;
  id: string;
}

const conversationInfos = () => {

  const router = useRouter()
  const params = useLocalSearchParams()
  const { conversationId, id, picture, name } = params
  const [usersInfos, setUsersInfos] = useState<Userinfos[]>([])
  const [createdAt, setCreatedAt] = useState('')
  const { reset } = useNavigation()

  useEffect(() => {
    emitAndListenEvent('conversationInfos', { conversationId, id }, (data) => {
      if (data.success) {
        setUsersInfos(data.conversationInfos.usersInfos)
        const date = new Date(data.conversationInfos.createdAt)
        const day = date.getDate()
        let month = (date.getMonth() + 1).toString()
        if (month.length === 1) month = `0${month}`
        const year = date.getFullYear()
        setCreatedAt(`${day}/${month}/${year}`)
      }
    })
  }, [])

  const blockParticipant = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Annuler', 'Bloquer le correspondant'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          const userToLock = usersInfos.filter((user: any) => user.id !== id)[0].id
          emitAndListenEvent('blockParticipant', { conversationId, id, userToLock }, (data) => {
            if (data.success) {
              emitAndListenEvent('deleteConversation', { id, conversationId }, (data) => {
                if (data.success) {
                  reset({ index: 0, routes: [{ name: 'homepage' as never }] })
                }
              })
            }
          })
        }
      }
    )
  }

  return (
    <View style={styles.container}>
      <ModalIndicator />
      <Avatar picture={picture as string} username={name as string} width={80} fontSize={35} />
      <View style={styles.InfosContainer}>
        <ConversationInfo title="Nom" data={name as string} />
        <ConversationInfo title="Date de création" data={createdAt} />
      </View>

      <Text style={styles.title}>Participants</Text>

      <View style={styles.InfosContainer}>
        {usersInfos.map((user: any, index: number) => (
          <TouchableOpacity key={index}>
            <ConversationInfo dataComponent={<Avatar picture={user.picture} username={user.username} width={25} fontSize={12} />} title={user.username} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.InfosContainer}>
        <TouchableOpacity key={"block"} style={styles.infos} onPress={blockParticipant}>
          <Text style={[styles.text, { color: "#007AFF" }]}>Bloquer le correspondant</Text>
        </TouchableOpacity>
        <TouchableOpacity key={"delete"} style={styles.infos} onPress={() => router.push({ pathname: "/confirmModal", params: { title: "Supprimer la conversation", subtitle: "Êtes-vous sûr de vouloir supprimer cette conversation ?", conversationId } })}>
          <Text style={[styles.text, { color: "#ff0000" }]}>Supprimer la conversation</Text>
        </TouchableOpacity>
      </View>
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
    gap: 20
  },
  title: {
    textAlign: 'left',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10
  },
  InfosContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  infos: {
    width: '100%',
    height: "auto",
    flexDirection: "row",
    backgroundColor: StyleConst.InfoBackgroundColor,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    paddingLeft: 15,
    paddingRight: 25,
    borderRadius: StyleConst.BorderRadius,
  },
  text: {
    fontSize: 16,
    color: StyleConst.TextColor,
    marginLeft: 10,
  }
})