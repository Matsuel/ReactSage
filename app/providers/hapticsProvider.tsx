import { createContext, useContext, useEffect, useState } from "react";
import { storeSecureData } from '../utils/storeData'
import { getSecureData } from '../utils/getData'


const HapticsContext = createContext<{
    hapticsEnabled: string | null;
    toggleHaptics: (enabled: string) => void;
} | null>(null);

const HAPTICS_KEY = 'hapticsEnabled';

const HapticsProvider = ({ children }: { children: React.ReactNode }) => {

    const [hapticsEnabled, setHapticsEnabled] = useState<string | null>(null);


    useEffect(() => {
        const loadHapticsSetting = async () => {
            const storedValue = await getSecureData(HAPTICS_KEY);
            if (storedValue === null) {
                // Si la valeur n'est pas définie, on la définit à 'true'
                await storeSecureData(HAPTICS_KEY, 'true');
                setHapticsEnabled('true');
            } else {
                // Si elle est déjà définie, on l'utilise
                setHapticsEnabled(storedValue as string);
            }
        };

        loadHapticsSetting();
    }, []);

    const toggleHaptics = async (enabled: string) => {
        await storeSecureData(HAPTICS_KEY, enabled);
        setHapticsEnabled(enabled);
    };

    return (
        <HapticsContext.Provider value={{ hapticsEnabled, toggleHaptics }}>
            {children}
        </HapticsContext.Provider>
    )
}

export default HapticsProvider;

export const useToggleHaptics = () => {
    const context = useContext(HapticsContext);
    if (context === null) {
        throw new Error("useToggleHaptics must be used within a HapticsProvider");
    }
    return context.toggleHaptics;
};

export const useHaptics = () => {
    const context = useContext(HapticsContext);
    if (context === null) {
        throw new Error("useHaptics must be used within a HapticsProvider");
    }
    return context.hapticsEnabled;
};