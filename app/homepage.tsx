import React, { useCallback, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import Navbar from './Components/Navbar'
import { StatusBar } from 'expo-status-bar'
import Button from './Components/Button'
import NewConversation from './assets/NewConversation'
import Search from './assets/Search'
import { router } from 'expo-router'
import { useStorageData } from './hooks/useStorageData'

const Home = () => {

    const [refreshing, setRefreshing] = useState(false)
    const { data: userId, loading } = useStorageData('id')
    console.log(userId, loading);


    const onRefresh = useCallback(() => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }, [])

    if (loading) {
        return <View style={styles.container}>
            <Text>Loading...</Text>
        </View>
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Navbar />
            <FlatList
                style={styles.flatList}
                data={[{ key: 'a' }, { key: 'b' }]}
                renderItem={({ item }) => <Text>{item.key}</Text>}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={'#fff'}
                    />
                }
            />
            <View style={styles.btns}>
                <Button variant='light' content="Recherche" icon={<Search color='#000' width={25} />} />
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
        marginTop: 15,
        position: 'relative',
    },
    btns: {
        position: 'absolute',
        bottom: 10,
        width: '110%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
        marginBottom: 40,
    }
})