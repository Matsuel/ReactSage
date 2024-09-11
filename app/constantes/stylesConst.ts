import { StyleSheet } from "react-native";

export const BorderRadius = 12;
export const BackgroundColor = "#0f0f0f";
export const TextColor = "#fff";
export const ModalBackgroundColor = "#161618";
export const keyBoardAppearance = "dark";
export const InfoBackgroundColor = "#2c2c2e";

export const modalStyles = StyleSheet.create({
    container: {
        height: "100%",
        maxHeight: "100%",
        justifyContent: "flex-end",
        backgroundColor: "transparent"
    },
    flatList: {
        width: '100%',
        maxHeight: '100%',
        marginTop: 15,
    },
    flatListContent: {
        paddingBottom: 100,
    },
});