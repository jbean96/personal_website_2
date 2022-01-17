import React, { PropsWithChildren, useContext } from "react";
import { Prism as ReactSyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark, materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styled from "styled-components";
import { useTheme } from "@mui/material";

import { CodeDisplayContext, CodeStyleContext, Renderer, RendererProps } from "components/posts/Code";
import { DarkModeContext } from "components/DarkMode";

const InlineCode = styled.code`
    background-color: ${({ theme }) => theme.palette.code};
    border-radius: ${({ theme }) => theme.spacing(0.5)};
    padding: ${({ theme }) => theme.spacing(0, 0.5)};
`;

const StyledReactSyntaxHighlighter = styled(ReactSyntaxHighlighter)`
    border-radius: ${({ theme }) => theme.spacing(1)};
`;

interface CodeProps {
    className?: string;
}

/**
 * Renders both inline and block code segments in a MDX post.
 *
 * In order to be considered a code block, the MD must be annotated with the language in which to interpret the code
 * snippet. For example
 *
 * ```jsx
 *     ...
 * ```
 */
export const Code = ({ className, children }: PropsWithChildren<CodeProps>) => {
    const { defaultExpanded, rowCutoff, useAccordion } = useContext(CodeDisplayContext);
    const { isDarkModeEnabled } = useContext(DarkModeContext);
    const { wrapLongLines } = useContext(CodeStyleContext);
    const theme = useTheme();

    if (!className?.startsWith("language")) {
        return <InlineCode>{children}</InlineCode>;
    }

    return (
        <StyledReactSyntaxHighlighter
            language="jsx"
            style={isDarkModeEnabled ? materialDark : materialLight}
            customStyle={{ margin: theme.spacing(0, 0, 2, 0) }}
            useInlineStyles
            wrapLongLines={wrapLongLines}
            renderer={(props: RendererProps) =>
                <Renderer
                    {...props}
                    useAccordion={useAccordion}
                    defaultExpanded={defaultExpanded}
                    rowCutoff={rowCutoff}
                />}
        >
            {children}
        </StyledReactSyntaxHighlighter>
    );
};