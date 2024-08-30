import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ModalIndicator from './Components/ModalIndicator'
import * as StyleConst from './constantes/stylesConst'

const ActiveConversation = () => {

    const params = useLocalSearchParams()
    const { id } = params

    return (
        <View style={styles.container}>
            <ModalIndicator />
            <Text style={{ color: "#fff" }}>{id}</Text>
        </View>
    )
}

export default ActiveConversation


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '95%',
        maxHeight: '95%',
        paddingLeft: "5%",
        paddingRight: "5%",
        backgroundColor: StyleConst.ModalBackgroundColor,
        alignItems: 'center',
        justifyContent: "flex-start",
        borderTopRightRadius: StyleConst.BorderRadius,
        borderTopLeftRadius: StyleConst.BorderRadius,
      },
})