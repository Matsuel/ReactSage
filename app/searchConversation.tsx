import React, { useEffect, useState } from 'react'
import { FlatList, Platform, StyleSheet, TextInput, View } from 'react-native'
import * as StyleConst from './constantes/stylesConst'
import { useStorageData } from './hooks/useStorageData'
import { ConversationInterfaceComponent } from '../server/type'
import { emitAndListenEvent } from './utils/events'
import ConversationComponent from './Components/Conversation'
import ModalIndicator from './Components/ModalIndicator'

const SearchConversation = () => {

    const { data: userId, loading } = useStorageData('id')

    const [conversations, setConversations] = useState<ConversationInterfaceComponent[]>([])
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        if (!loading) {
            emitAndListenEvent('getConversations', { id: userId }, (data) => {
                if (data.success) {
                    setConversations(data.conversations)
                }
            })
        }
    }, [loading])

    return (
        <View style={styles.container}>
            <ModalIndicator />
            <TextInput
                placeholder="Rechercher une conversation"
                style={styles.input}
                placeholderTextColor={"#fff"}
                keyboardAppearance='dark'
                enablesReturnKeyAutomatically={true}
                value={search}
                onChangeText={setSearch}
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                style={[StyleConst.modalStyles.flatList, {height: "75%"}]}
                contentContainerStyle={StyleConst.modalStyles.flatListContent}
                data={conversations.filter((conversation) => conversation.name.toLowerCase().includes(search.toLowerCase()))}
                renderItem={({ item }) => <ConversationComponent {...item} id={userId as string} />}
            />
        </View>
    )
}

export default SearchConversation

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingLeft: "5%",
        paddingRight: "5%",
        backgroundColor: StyleConst.BackgroundColor,
        alignItems: 'center',
        justifyContent: "flex-start",
        borderTopRightRadius: StyleConst.BorderRadius,
        borderTopLeftRadius: StyleConst.BorderRadius,
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