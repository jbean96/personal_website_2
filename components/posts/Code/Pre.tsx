import React, { FC, useMemo } from "react";

interface CodeDisplayContextType {
    defaultExpanded?: boolean;
    rowCutoff?: number;
    useAccordion?: boolean;
}

export const CodeDisplayContext = React.createContext<CodeDisplayContextType>({
    defaultExpanded: false,
    rowCutoff: 10,
    useAccordion: false
});

export const Pre: FC<CodeDisplayContextType> = ({ children, defaultExpanded, rowCutoff, useAccordion }) => {
    const contextValue = useMemo(() => ({
        defaultExpanded,
        rowCutoff,
        useAccordion
    }), [defaultExpanded, rowCutoff, useAccordion]);

    return (
        <CodeDisplayContext.Provider value={contextValue}>
            {children}
        </CodeDisplayContext.Provider>
    );
};