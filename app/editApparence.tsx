import { BlurView } from 'expo-blur'
import React from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import * as StyleConst from './constantes/stylesConst'
import Title from './Components/Title'
import ModalIndicator from './Components/ModalIndicator'
import { useHaptics, useToggleHaptics } from './providers/hapticsProvider'

const EditApparence = () => {

    const hapticsEnabled = useHaptics()
    const toggleHaptics = useToggleHaptics()

    return (
        <View
            style={styles.container}
        >
            <ModalIndicator />
            <Title title="Modifier l'apparence" />

            <View style={styles.settingsContainer}>
                <View style={styles.settings}>
                    <Text style={styles.text}>Vibrations des boutons</Text>
                    <Switch
                        trackColor={{ false: "#39383d", true: "#2fd159" }}
                        thumbColor={StyleConst.TextColor}
                        onValueChange={() => toggleHaptics(hapticsEnabled === 'true' ? 'false' : 'true')}
                        value={hapticsEnabled === 'true'}
                    />
                </View>
            </View>

        </View>
    )
}

export default EditApparence

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderTopLeftRadius: StyleConst.BorderRadius,
        borderTopRightRadius: StyleConst.BorderRadius,
        gap: 20,
        paddingLeft: "5%",
        paddingRight: "5%",
        backgroundColor: "#000",
    },
    settingsContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
    },
    settings: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "rgba(15, 15, 15, 0.5)",
        padding: "5%",
        borderRadius: StyleConst.BorderRadius,
    },
    text: {
        width: '70%',
        color: StyleConst.TextColor,
        fontSize: 20,
    }
})