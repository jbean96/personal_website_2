import { Add, Remove } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, alpha, Typography } from "@mui/material";
import React, { FC, useContext, useMemo, useState } from "react";
import { createElement, Prism as ReactSyntaxHighlighter } from "react-syntax-highlighter";
import styled from "styled-components";

const StyledAccordion = styled(Accordion)`
    --expanderHeight: 32px;

    &.code-accordion {
        background-color: unset;
        border-radius: 0;
        padding-bottom: var(--expanderHeight);
        position: relative;
    }

    .code-accordion-details {
        padding: 0;
    }

    .code-accordion-summary {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        gap: ${({ theme }) => theme.spacing(1)};
        height: var(--expanderHeight);
        min-height: unset;
    }

    .code-accordion-summary-content {
        justify-content: flex-end;
        margin: auto 0;
    }
`;

interface RendererAccordionProps {
    defaultExpanded?: boolean;
    useAccordion?: boolean;
    rowCutoff?: number;
}

interface RendererProps {
    rows: any;
    stylesheet: any;
    useInlineStyles: any;
}

// TODO: Type this function
export const Renderer: FC<RendererProps & RendererAccordionProps> = ({
    rows,
    stylesheet,
    useInlineStyles,
    defaultExpanded = false,
    useAccordion = false,
    rowCutoff = 10
}) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    const handleOnChange = () => setExpanded(expanded => !expanded);

    return (
        <>
            {(useAccordion ? rows.slice(0, rowCutoff) : rows)
                .map((row, index) => createElement({ key: index, node: row, stylesheet, useInlineStyles }))}
            {useAccordion && <StyledAccordion
                className="code-accordion"
                elevation={0}
                expanded={expanded}
                onChange={handleOnChange}
            >
                <AccordionSummary
                    classes={{
                        content: "code-accordion-summary-content"
                    }}
                    className="code-accordion-summary"
                    expandIcon={expanded ? <Remove /> : <Add />}
                >
                    <Typography variant="subtitle1">Show {expanded ? "Less" : "More"}</Typography>
                </AccordionSummary>
                <AccordionDetails className="code-accordion-details">
                    {rows.slice(rowCutoff)
                        .map((row, index) => createElement({ key: index, node: row, stylesheet, useInlineStyles }))}
                </AccordionDetails>
            </StyledAccordion>}
        </>
    );
};

const StyledInlineCode = styled.code`
    & {
        background-color: ${({ theme }) => alpha(theme.palette.secondary.main, 0.4)};
        border-radius: ${({ theme }) => theme.spacing(0.5)};
        padding: ${({ theme }) => theme.spacing(0, 0.5)};
    }
`;

interface CodeProps {
    className?: string;
}

export interface CodeDisplayContextType {
    defaultExpanded?: boolean;
    rowCutoff?: number;
    useAccordion?: boolean;
}

export const CodeDisplayContext = React.createContext<CodeDisplayContextType>({
    defaultExpanded: false,
    rowCutoff: 10,
    useAccordion: false
});

export const Code: FC<CodeProps> = ({ className, children }) => {
    const { defaultExpanded, rowCutoff, useAccordion } = useContext(CodeDisplayContext);

    if (!className?.startsWith("language")) {
        return <StyledInlineCode>{children}</StyledInlineCode>;
    }

    return (
        <ReactSyntaxHighlighter
            language="jsx"
            renderer={(props: RendererProps) =>
                <Renderer
                    {...props}
                    useAccordion={useAccordion}
                    defaultExpanded={defaultExpanded}
                    rowCutoff={rowCutoff}
                />}
            wrapLongLines
        >
            {children}
        </ReactSyntaxHighlighter>
    );
};

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