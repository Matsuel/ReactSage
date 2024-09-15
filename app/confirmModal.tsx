import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as StyleConst from './constantes/stylesConst'
import ModalIndicator from './Components/ModalIndicator'
import Title from './Components/Title'
import Button from './Components/Button'
import { router, useLocalSearchParams } from 'expo-router'
import { useNavigation } from 'expo-router'
import { deleteSecureData } from './utils/deleteData'
import { useStorageData } from './hooks/useStorageData'
import { emitAndListenEvent } from './utils/events'

const ModalConfirm = () => {

    const params = useLocalSearchParams()
    const { title, subtitle, conversationId } = params

    const { reset } = useNavigation()

    const { data: id, loading } = useStorageData('id')

    const deleteAccount = async () => {
        emitAndListenEvent('deleteAccount', { id }, async (data) => {
            console.log(data)
            if(data.success) {
                await disconnect()
            }
        })
    }

    const disconnect = async () => {
        await deleteSecureData('phone')
        await deleteSecureData('pin')
        await deleteSecureData('username')
        await deleteSecureData('id')
        await deleteSecureData('login')
        reset({ index: 0, routes: [{ name: 'welcome' as never }] })
    }

    const deleteConversation = async () => {
        emitAndListenEvent('deleteConversation', { id, conversationId }, (data) => {
            if (data.success) {
                reset({ index: 0, routes: [{ name: 'homepage' as never }] })
            }
        })
    }

    const onPress = async () => {
        if(title as string === 'Suppression du compte') {
            await deleteAccount()
        } else if (title as string === 'Déconnexion') {
            await disconnect()
        } else if (title as string === 'Supprimer la conversation') {
            await deleteConversation()
        } else {
            console.log('error')
        }
    }

    if (loading) return null

    return (
        <View style={styles.container}>
            <ModalIndicator />
            <Title title={title as string} />
            <Text style={styles.subtitle}>{subtitle}</Text>
            <View style={styles.btns}>
                <Button variant='light' content='Confirmer' onPress={onPress} />
                <Button variant='transparentLight' content='Annuler' onPress={() => router.back()} />
            </View>
        </View>
    )
}

export default ModalConfirm

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '40%',
        maxHeight: '75%',
        paddingLeft: "5%",
        paddingRight: "5%",
        backgroundColor: StyleConst.ModalBackgroundColor,
        alignItems: 'center',
        justifyContent: "flex-start",
        borderTopRightRadius: StyleConst.BorderRadius,
        borderTopLeftRadius: StyleConst.BorderRadius,
        gap: 20,
    },
    subtitle: {
        color: StyleConst.TextColor,
        fontSize: 16,
        textAlign: 'center'
    },
    btns: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 15,
    }
})