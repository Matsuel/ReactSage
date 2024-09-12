import Help from "../assets/Help";
import Paint from "../assets/Paint";
import UserIcon from "../assets/User";
import NotificationsIcon from "../assets/Notifications";
import Cloud from "../assets/Cloud";
import * as StyleConst from "./stylesConst";
import Protection from "../assets/Protection";
import Trash from "../assets/Trash";
import Power from "../assets/Power";

export interface ProfileData {
    text: string,
    icon: React.ReactNode,
}

const iconWidth = 30

export const profileDatas = {
    "1": [
        { text: "Aide", icon: <Help color={StyleConst.TextColor} width={iconWidth} /> },
        { text: "Compte", icon: <UserIcon color={StyleConst.TextColor} width={iconWidth} /> },
        { text: "Apparence", icon: <Paint color={StyleConst.TextColor} width={iconWidth} /> },
        { text: "Gérer les notifications", icon: <NotificationsIcon color={StyleConst.TextColor} width={iconWidth} /> },
        { text: "Synchronisation", icon: <Cloud color={StyleConst.TextColor} width={iconWidth} /> },
    ] as ProfileData[],
    "2": [
        { text: "Voir les personnes bloquées", icon: <Protection color={StyleConst.TextColor} width={iconWidth} /> },
        { text: "Supprimer le compte", icon: <Trash color={StyleConst.TextColor} width={iconWidth} /> },
        { text: "Déconnexion", icon: <Power color={StyleConst.TextColor} width={iconWidth} /> },
    ] as ProfileData[],
}