import path from "path";

import glob from "glob";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import { Button, Container, Typography } from "@mui/material";
import React, { PropsWithChildren, useMemo} from "react";
import { ArrowBack } from "@mui/icons-material";
import styled from "styled-components";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";
import { remarkMdxCodeMeta } from "remark-mdx-code-meta";

import { SubTitle, Title } from "components/posts/Title";
import { Image } from "components/posts/Image";
import { PostMetadata, validatePostMetadata } from "components/posts";
import { Code, Pre } from "components/posts/Code";
import { BlockQuote } from "components/posts/BlockQuote";

const StyledParagraph = styled(Typography)`
    margin-bottom: ${({ theme }) => theme.spacing(2)};

    ${({ theme }) => theme.breakpoints.down("md")} {
        text-align: justify;
    }
`;

const Paragraph = ({ children }: PropsWithChildren<{}>) => {
    return <StyledParagraph variant="body1">{children}</StyledParagraph>;
};

const StyledUl = styled.ul`
    list-style: none;
    padding-left: ${({ theme }) => theme.spacing(0)};

    ${({ theme }) => theme.breakpoints.down("md")} {
        text-align: justify;
    }
`;

const StyledOl = styled.ol`
    ${({ theme }) => theme.breakpoints.down("md")} {
        text-align: justify;
    }
`;

const StyledLi = styled.li`
    margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const ListItem = ({ children }: PropsWithChildren<{}>) => {
    return (
        <StyledLi>
            <Typography variant="body1">{children}</Typography>
        </StyledLi>
    );
};

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
    compiledMdx: string;
    slug: string;
}

export const getStaticProps: GetStaticProps<PostProps, { slug: string }> = async ({ params }) => {
    if (!params?.slug) {
        throw new Error(`Missing slug from: ${JSON.stringify(params)}`);
    }
    const { slug } = params;

    const { code: compiledMdx, frontmatter: data } = await bundleMDX<PostMetadata>({
        file: path.resolve("posts", slug, "post.mdx"),
        cwd: path.resolve("posts", slug),
        xdmOptions: (options) => {
            // @ts-ignore
            options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkMdxCodeMeta];
            return options;
        }
    });

    if (!validatePostMetadata(data)) {
        throw new Error(`Invalid post metadata: ${slug}`);
    }

    return {
        props: {
            data,
            slug,
            compiledMdx
        }
    };
};

const Post: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ data, compiledMdx }) => {
    const MDXComponent = useMemo(() => getMDXComponent(compiledMdx), [compiledMdx]);

    return (
        <Container maxWidth={"md"}>
            <Title backButton>{data.title}</Title>
            <SubTitle>{data.date}</SubTitle>
            <MDXComponent
                components={{
                    // Image: PostImage,
                    h1: (props) => <Typography sx={{ mt: theme => theme.spacing(4), mb: theme => theme.spacing(2.5) }} variant="h1" {...props} />,
                    h2: (props) => <Typography sx={{ mt: theme => theme.spacing(4), mb: theme => theme.spacing(2.5) }} variant="h2" {...props} />,
                    h3: (props) => <Typography sx={{ mt: theme => theme.spacing(4), mb: theme => theme.spacing(2.5) }} variant="h2" {...props} />,
                    pre: Pre,
                    code: Code,
                    li: ListItem,
                    p: Paragraph,
                    blockquote: BlockQuote,
                    ul: StyledUl,
                    ol: StyledOl,
                    Image
                }}
            />
            <Link href="/" passHref>
                <Button startIcon={<ArrowBack />} sx={{ mb: theme => theme.spacing(2)}}>Return to Home</Button>
            </Link>
        </Container>
    );
};

export default Post;