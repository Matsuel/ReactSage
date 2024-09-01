import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as StyleConst from './constantes/stylesConst'
import { emitAndListenEvent, emitEvent } from './utils/events'
import { MessageInterfaceComponent } from '../server/type'
import ModalIndicator from './Components/ModalIndicator'
import Send from './assets/Send'

const ActiveConversation = () => {

    const [isKeyboardOpen, setIsKeyboardOpen] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
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

    const sendMessage = () => {
        if (message.trim() === '') return
        emitAndListenEvent('sendMessage', { id, conversationId, message }, (data) => {
            if (data.success) {
                emitEvent('getMessages', { id, conversationId })
                setMessage('')
            }
        })
    }


    return (
        <View style={styles.container}>
            <ModalIndicator />
            <FlatList
                style={styles.flatList}
                data={messages}
                renderItem={({ item }) => (
                    <Text style={{color: "#fff"}}>{item.content}</Text>
                )}
                keyExtractor={(item) => item._id}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
            >
                <View
                    style={[styles.inputContainer, { marginBottom: isKeyboardOpen ? 70 : 20 }]}
                >
                    <TextInput
                        placeholder="Ecrivez votre message"
                        style={styles.input}
                        placeholderTextColor={"#fff"}
                        keyboardAppearance='dark'
                        onFocus={() => setIsKeyboardOpen(true)}
                        onBlur={() => setIsKeyboardOpen(false)}
                        multiline={true}
                        value={message}
                        onChangeText={(text) => setMessage(text)}
                    />
                    <TouchableOpacity onPress={sendMessage}>
                        <Send color='#fff' width={40} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
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
        backgroundColor: StyleConst.BackgroundColor,
        alignItems: 'center',
        justifyContent: "flex-start",
    },
    flatList: {
        width: '100%',
        height: '100%',
        marginTop: 20,
    },
    keyboardAvoidingView: {
        width: '100%',
        height: "auto",
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        gap: 10,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#2e2f31',
        color: '#fff',
        paddingLeft: 15,
        borderRadius: StyleConst.BorderRadius,
        textAlignVertical: "center",
        paddingVertical: Platform.OS === "ios" ? 15 : 0,
    },
})