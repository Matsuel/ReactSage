import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as StyleConst from './constantes/stylesConst'
import { emitAndListenEvent } from './utils/events'
import { MessageInterfaceComponent } from '../server/type'
import ConversationHeader from './Components/ConversationHeader'

const ActiveConversation = () => {

    const [messages, setMessages] = useState<MessageInterfaceComponent[]>([])
    const params = useLocalSearchParams()
    const { conversationId, picture, name, id } = params


    useEffect(() => {
        emitAndListenEvent('getMessages', { id, conversationId }, (data) => {
            if (data.success) {
                setMessages(data.messages)
            }
        })
    }, [])

    return (
        <View style={styles.container}>
            <ConversationHeader 
                picture={picture as string}
                name={name as string}
            />
            {/* <Text style={{ color: "#fff" }}>{id}</Text> */}
        </View>
    )
}

export default ActiveConversation


const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        height: '100%',
        paddingLeft: "5%",
        paddingRight: "5%",
        backgroundColor: StyleConst.ModalBackgroundColor,
        alignItems: 'center',
        justifyContent: "flex-start",
    },
})