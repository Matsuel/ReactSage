import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import Navbar from './Components/Navbar'
import { StatusBar } from 'expo-status-bar'
import Button from './Components/Button'
import NewConversation from './assets/NewConversation'
import Search from './assets/Search'
import { router } from 'expo-router'
import { useStorageData } from './hooks/useStorageData'
import { ConversationInterfaceComponent } from '../server/type'
import { emitAndListenEvent } from './utils/events'
import ConversationComponent from './Components/Conversation'
import * as StyleConst from './constantes/stylesConst'

const Home = () => {

    const [refreshing, setRefreshing] = useState(false)
    const { data: userId, loading } = useStorageData('id')

    const [conversations, setConversations] = useState<ConversationInterfaceComponent[]>([])

    useEffect(() => {
        if (!loading) {
            emitAndListenEvent('getConversations', { id: userId }, (data) => {
                if (data.success) {
                    setConversations(data.conversations)
                }
            })
        }
    }, [loading])

    const onRefresh = useCallback(() => {
        if (!loading) {
            setRefreshing(true)
            emitAndListenEvent('getConversations', { id: userId }, (data) => {
                if (data.success) {
                    setConversations(data.conversations)
                    setTimeout(() => {
                        setRefreshing(false);
                    }, 500);
                }
            })
        }
    }, [loading])

    if (loading) {
        return <View style={styles.container}>
            <Text>Loading...</Text>
        </View>
    }

    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <Navbar />
            <View style={styles.header}>
                <Text style={styles.title}>Conversations</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.flatList}
                contentContainerStyle={styles.flatListContent}
                data={conversations}
                renderItem={({ item }) => <ConversationComponent {...item} />}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={'#fff'}
                    />
                }
            />
            <View style={styles.btns}>
                <Button variant='light' content="Recherche" icon={<Search color='#000' width={25}/>} />
                <Button onPress={() => router.push({ pathname: "/createconversation", params: { id: userId } })} variant='light' content="Créer" icon={<NewConversation color='#000' width={25} />} />
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingLeft: "5%",
        paddingRight: "5%",
        backgroundColor: '#000',
    },
    flatList: {
        width: '100%',
        maxHeight: '100%',
        marginTop: 15,
    },
    flatListContent: {
        paddingBottom: 100,
    },
    btns: {
        position: 'absolute',
        bottom: 10,
        width: '110%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "transparent",
        gap: 25,
        marginBottom: 40,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 15,
    },
    title: {
        color: StyleConst.TextColor,
        fontSize: 32,
        fontWeight: "bold",
    },
})