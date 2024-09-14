import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as StyleConst from './constantes/stylesConst'
import ModalIndicator from './Components/ModalIndicator'
import Title from './Components/Title'
import Button from './Components/Button'
import { router, useNavigation } from 'expo-router'
import { deleteSecureData } from './utils/deleteData'

const Disconnect = () => {
    const { reset } = useNavigation()

    const disconnect = async () => {
        await deleteSecureData('phone')
        await deleteSecureData('pin')
        await deleteSecureData('username')
        await deleteSecureData('id')
        await deleteSecureData('login')
        reset({ index: 0, routes: [{ name: 'welcome' as never }] })
    }

    return (
        <View style={styles.container}>
            <ModalIndicator />
            <Title title="Déconnexion" />
            <Text style={styles.subtitle}>Êtes-vous sûr de vouloir vous déconnecter ?</Text>
            <View style={styles.btns}>
                <Button variant='light' content='Déconnexion' onPress={disconnect} />
                <Button variant='transparentLight' content='Annuler' onPress={() => router.back()} />
            </View>
        </View>
    )
}

export default Disconnect

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