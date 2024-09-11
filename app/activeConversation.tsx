import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import * as StyleConst from './constantes/stylesConst'
import { emitAndListenEvent, emitEvent, listenEvent } from './utils/events'
import { MessageInterfaceComponent } from '../server/type'
import ModalIndicator from './Components/ModalIndicator'
import Send from './assets/Send'
import Message from './Components/Message'
import * as Haptics from 'expo-haptics'
import Typing from './Components/Typing'
import MessageView from './Components/MessageView'
import ConversationHeader from './Components/ConversationHeader'

const ActiveConversation = () => {

    const [isKeyboardOpen, setIsKeyboardOpen] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [messages, setMessages] = useState<MessageInterfaceComponent[]>([])
    const params = useLocalSearchParams()
    const { conversationId, picture, name, id } = params
    const flatListRef = useRef<FlatList>(null)
    const [usernameTyping, setUsernameTyping] = useState<string[]>([])

    const typingTimeout = useRef<NodeJS.Timeout>()


    useEffect(() => {
        emitEvent('updateViewed', { id, conversationId })

        emitAndListenEvent('getMessages', { id, conversationId }, (data) => {
            if (data.success) {
                setMessages(data.messages)
                flatListRef.current?.scrollToEnd({ animated: true })
            }
        })

        listenEvent('newMessage', (data) => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
            if (data.conversationId === conversationId) {
                emitEvent('getMessages', { id, conversationId })
            }
        })

    }, [])

    useEffect(() => {
        listenEvent('typing', (data) => {
            const { name: typingUser } = data
            if (usernameTyping.includes(typingUser)) return
            setUsernameTyping([...usernameTyping, typingUser])

            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true })
            }, 60)
            
            if (typingTimeout.current) clearTimeout(typingTimeout.current)

            typingTimeout.current = setTimeout(() => {
                setUsernameTyping([])
            }, 5000)
        })
    }, [usernameTyping])

    const sendMessage = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        if (message.trim() === '') return
        emitAndListenEvent('sendMessage', { id, conversationId, message }, (data) => {
            if (data.success) {
                emitEvent('getMessages', { id, conversationId })
                setMessage('')
                flatListRef.current?.scrollToEnd({ animated: true })
            }
        })
    }

    const focusKeyboard = () => {
        setIsKeyboardOpen(true)
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true })
        }, 60)
    }

    const typing = (e = { nativeEvent: { key: '' } }) => {
        if (e.nativeEvent.key === 'Backspace') return
        emitEvent('typing', { id, conversationId, name })
    }


    return (
        <View style={styles.container}>
            <ConversationHeader picture={picture as string} name={name as string} id={id as string} conversationId={conversationId as string} />
            <FlatList
                style={styles.flatList}
                data={messages}
                renderItem={({ item }) => (<Message {...item} myId={id as string} authorName={name as string} />)}
                keyExtractor={(item) => item._id}
                ref={flatListRef}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                ListFooterComponent={
                    <View style={{ width: '100%', height: "auto" }} >
                        <Typing picture={picture as string} username={usernameTyping} />
                    </View>
                }
                showsVerticalScrollIndicator={false}
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
                        onFocus={focusKeyboard}
                        onBlur={() => setIsKeyboardOpen(false)}
                        multiline={true}
                        value={message}
                        onChangeText={(text) => setMessage(text)}
                        onKeyPress={typing}
                        enablesReturnKeyAutomatically={true}
                    />
                    <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                        <Send color='#fff' width={30} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View >
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
    },
    inputContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
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
    sendButton: {
        width: 50,
        height: 50,
        backgroundColor: "#2e2f31",
        borderRadius: StyleConst.BorderRadius,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
})