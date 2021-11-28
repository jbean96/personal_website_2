import React, { FC, useCallback, useMemo, useState } from "react";

import { setDarkModeCookie } from "./darkMode";

interface DarkModeContextType {
    isDarkModeEnabled: boolean;
    toggleDarkMode: () => void;
}

export const DarkModeContext = React.createContext<DarkModeContextType>({
    isDarkModeEnabled: false,
    toggleDarkMode: () => {}
});

export interface DarkModeContextProviderProps {
    initialIsDarkModeEnabled: boolean;
}

export const DarkModeContextProvider: FC<DarkModeContextProviderProps> = ({ children, initialIsDarkModeEnabled }) => {
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(initialIsDarkModeEnabled);
    const toggleDarkMode = useCallback(() => setIsDarkModeEnabled(isDarkModeEnabled => {
        const newValue = !isDarkModeEnabled;
        setDarkModeCookie(newValue);
        return newValue;
    }), []);

    const contextValue = useMemo<DarkModeContextType>(() => ({
        isDarkModeEnabled,
        toggleDarkMode
    }), [isDarkModeEnabled, toggleDarkMode]);

    return (
        <DarkModeContext.Provider value={contextValue}>
            {children}
        </DarkModeContext.Provider>
    );
};