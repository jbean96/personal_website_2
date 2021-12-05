import { Add, Remove, ShortText, WrapText } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Tooltip, Typography } from "@mui/material";
import React, { FC, useContext, useState } from "react";
import styled from "styled-components";
import { createElement } from "react-syntax-highlighter";

import { CodeStyleContext } from ".";

const StyledAccordion = styled(Accordion)`
    --expanderHeight: 32px;

    &.code-accordion {
        color: unset;
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

const StyledIconButton = styled(IconButton)`
    display: block;
    line-height: 0;
    margin-left: auto;
`;

interface RendererAccordionProps {
    defaultExpanded?: boolean;
    useAccordion?: boolean;
    rowCutoff?: number;
}

export interface RendererProps {
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
    const { wrapLongLines, toggleWrapLongLines } = useContext(CodeStyleContext);
    const [expanded, setExpanded] = useState(defaultExpanded);

    const handleOnChange = () => setExpanded(expanded => !expanded);

    return (
        <>
            <Tooltip title={wrapLongLines ? "Unwrap lines" : "Wrap long lines"}>
                <StyledIconButton onClick={toggleWrapLongLines}>
                    {wrapLongLines ? <ShortText /> : <WrapText />}
                </StyledIconButton>
            </Tooltip>
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