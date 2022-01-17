import React, { PropsWithChildren, useMemo } from "react";

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

export const Pre = ({ children, defaultExpanded, rowCutoff, useAccordion }: PropsWithChildren<CodeDisplayContextType>) => {
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