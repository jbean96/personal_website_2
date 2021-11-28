import React, { FC, useContext } from "react";
import { Prism as ReactSyntaxHighlighter } from "react-syntax-highlighter";
import styled from "styled-components";

import { CodeDisplayContext, Renderer, RendererProps } from "components/posts/Code";

const InlineCode = styled.code`
    & {
        background-color: ${({ theme }) => theme.palette.code};
        border-radius: ${({ theme }) => theme.spacing(0.5)};
        padding: ${({ theme }) => theme.spacing(0, 0.5)};
    }
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
export const Code: FC<CodeProps> = ({ className, children }) => {
    const { defaultExpanded, rowCutoff, useAccordion } = useContext(CodeDisplayContext);

    if (!className?.startsWith("language")) {
        return <InlineCode>{children}</InlineCode>;
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
        >
            {children}
        </ReactSyntaxHighlighter>
    );
};