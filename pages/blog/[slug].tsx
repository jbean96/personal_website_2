import fs from "fs";
import path from "path";

import glob from "glob";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Accordion, AccordionDetails, AccordionSummary, alpha, Button, Container, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { createElement, dark, Prism as ReactSyntaxHighlighter } from "react-syntax-highlighter";
import { Add, ArrowBack, Remove } from "@mui/icons-material";
import styled from "styled-components";

import { PageTitle } from "components/PageTitle";
import PostImage from "components/posts/PostImage/PostImage";
import { PostMetadata, validatePostMetadata } from "components/posts";

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

const StyledHighlight = styled.div`
    & {
        background-color: ${({ theme }) => alpha(theme.palette.secondary.light, 0.2)};
        border-left: ${({ theme }) => theme.spacing(1)} solid ${({ theme }) => theme.palette.secondary.dark};
        padding: ${({ theme }) => theme.spacing(2)};
        border-radius: ${({ theme }) => theme.spacing(0.5)};
        margin: ${({ theme }) => theme.spacing(0, 2, 2, 2)};

        > * {
            margin: 0;
        }
    }
`;

const Highlight: FC = ({ children }) => {
    return <StyledHighlight>{children}</StyledHighlight>;
};

interface CodeProps {
    defaultExpanded?: string; // boolean
    rowCutoff?: string; // number
    useAccordion?: string; // boolean
}

const Code: FC<CodeProps> = ({ children, defaultExpanded, rowCutoff, useAccordion }) => {
    const parsedRowCutoff = rowCutoff ? parseInt(rowCutoff) : NaN;

    return (
        <ReactSyntaxHighlighter
            language="jsx"
            renderer={(props: RendererProps) =>
                <Renderer
                    {...props}
                    useAccordion={useAccordion ? useAccordion === "true" : undefined}
                    defaultExpanded={defaultExpanded ? defaultExpanded === "true" : undefined}
                    rowCutoff={isNaN(parsedRowCutoff) ? undefined : parsedRowCutoff}
                />}
            style={dark}
            wrapLongLines
        >
            {children}
        </ReactSyntaxHighlighter>
    );
};

const Paragraph: FC = ({ children }) => {
    return <Typography sx={{ mb: theme => theme.spacing(2) }} variant="body1">{children}</Typography>;
};

const StyledUl = styled.ul`
    & {
        list-style: none;
        margin: ${({ theme }) => theme.spacing(2, 0)};
        padding-left: ${({ theme }) => theme.spacing(4)};
    }
`;

const StyledLi = styled.li`
    & {
        margin-bottom: ${({ theme }) => theme.spacing(2)};
    }
`;

const ListItem: FC = ({ children }) => {
    return (
        <StyledLi>
            <Typography variant="body1">{children}</Typography>
        </StyledLi>
    );
};

const StyledInlineCode = styled.code`
    & {
        background-color: ${({ theme }) => alpha(theme.palette.secondary.main, 0.4)};
        border-radius: ${({ theme }) => theme.spacing(0.5)};
        padding: ${({ theme }) => theme.spacing(0, 0.5)};
    }
`;

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = glob.sync("posts/**/post.mdx");

    const slugs = paths
        .map(filePath => {
            const parsedPath = path.parse(filePath);
            const splitDirs = parsedPath.dir.split(path.sep);

            return { params: { slug: splitDirs[splitDirs.length - 1] }};
        });

    return {
        paths: slugs,
        fallback: false
    };
};

interface PostProps {
    data: PostMetadata;
    mdxSource: MDXRemoteSerializeResult;
    slug: string;
}

export const getStaticProps: GetStaticProps<PostProps, { slug: string }> = async ({ params }) => {
    if (!params?.slug) {
        throw new Error(`Missing slug from: ${JSON.stringify(params)}`);
    }
    const { slug } = params;

    const markdownWithMeta = fs.readFileSync(path.join("posts", slug, "post.mdx"), "utf-8");

    const { data, content } = matter(markdownWithMeta);
    if (!validatePostMetadata(data)) {
        throw new Error(`Invalid post metadata: ${slug}`);
    }
    const mdxSource = await serialize(content);

    console.log(mdxSource.compiledSource);

    return {
        props: {
            data,
            slug,
            mdxSource
        }
    };
};

const Post: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ data, mdxSource }) => {
    return (
        <Container maxWidth={"md"}>
            <PageTitle backButton>{data.title}</PageTitle>
            <Typography sx={{ mb: theme => theme.spacing(4) }} variant="subtitle2">{data.date}</Typography>
            <MDXRemote
                {...mdxSource}
                components={{
                    code: Code,
                    Highlight,
                    Image: PostImage,
                    inlineCode: StyledInlineCode,
                    li: ListItem,
                    p: Paragraph,
                    ul: StyledUl
                }}
            />
            <Link href="/blog" passHref>
                <Button startIcon={<ArrowBack />} sx={{ mb: theme => theme.spacing(2)}}>Return to Blog</Button>
            </Link>
        </Container>
    );
};

export default Post;