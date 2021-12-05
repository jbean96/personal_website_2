import React, { FC, useCallback, useMemo, useState } from "react";

import { setWrapLongLinesCookie } from ".";

export interface CodeStyleContextType {
    wrapLongLines: boolean;
    toggleWrapLongLines: () => void;
}

export const CodeStyleContext = React.createContext<CodeStyleContextType>({
    wrapLongLines: false,
    toggleWrapLongLines: () => {}
});

export const CodeStyleContextProvider: FC<{ initialWrapLongLines?: boolean }> = ({
    children,
    initialWrapLongLines
}) => {
    const [wrapLongLines, setWrapLongLines] = useState(initialWrapLongLines ?? false);

    const toggleWrapLongLines = useCallback(() => {
        setWrapLongLines(wrap => {
            setWrapLongLinesCookie(!wrap);
            return !wrap;
        });
    }, []);

    const contextValue = useMemo(() => ({
        wrapLongLines,
        toggleWrapLongLines
    }), [wrapLongLines, toggleWrapLongLines]);

    return (
        <CodeStyleContext.Provider value={contextValue}>
            {children}
        </CodeStyleContext.Provider>
    );
};