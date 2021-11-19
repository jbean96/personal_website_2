import path from "path";

import glob from "glob";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import { Button, Container, Typography } from "@mui/material";
import React, { FC, useMemo} from "react";
import { ArrowBack } from "@mui/icons-material";
import styled from "styled-components";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";
import { remarkMdxCodeMeta } from "remark-mdx-code-meta";

import { PageTitle } from "components/PageTitle";
import { PostMetadata, validatePostMetadata } from "components/posts";
import { Code, Pre } from "posts/components/Code";
import Highlight from "posts/components/Highlight";

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

const ListItem = ({ children }) => {
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

    console.log(process.cwd());

    const { code: compiledMdx, frontmatter: data } = await bundleMDX<PostMetadata>({
        file: path.resolve("posts", slug, "post.mdx"),
        cwd: path.resolve("posts", slug),
        xdmOptions: (options) => {
            // this is the recommended way to add custom remark/rehype plugins:
            // The syntax might look weird, but it protects you in case we add/remove
            // plugins in the future.
            options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkMdxCodeMeta];
            return options;
        }
        // esbuildOptions: (options) => {
        //     options.platform = "node";
        //     return options;
        // }
    });

    console.log(compiledMdx);

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
    const MDXComponent = useMemo(() => {
        return getMDXComponent(
            compiledMdx
        );
    }, [compiledMdx]);

    return (
        <Container maxWidth={"md"}>
            <PageTitle backButton>{data.title}</PageTitle>
            <Typography sx={{ mb: theme => theme.spacing(4) }} variant="subtitle2">{data.date}</Typography>
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
                    "blockquote": Highlight,
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