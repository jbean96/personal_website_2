import fs from "fs";
import path from "path";

import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import glob from "glob";
import matter from "gray-matter";
import React from "react";
import { Container, Stack } from "@mui/material";

import { PageTitle } from "components/PageTitle";
import { PostCard, PostData, validatePostMetadata } from "components/posts";

// TODO: Make this getRenderedProps and fetch the lists of posts from elsewhere
export const getStaticProps: GetStaticProps<{ posts: PostData[] }> = async () => {
    const paths = glob.sync("posts/!(components)/post.mdx");

    const posts = paths
        .map(filePath => {
            const parsedPath = path.parse(filePath);
            const splitDirs = parsedPath.dir.split(path.sep);
            const slug = splitDirs[splitDirs.length - 1];

            const markdownWithMeta = fs.readFileSync(filePath);
            const { data } = matter(markdownWithMeta);

            if (!validatePostMetadata(data)) {
                throw new Error(`Invalid post metadata: ${filePath}`);
            }

            return {
                metadata: data,
                slug
            };
        });

    // TODO: Sort by date

    return { props: { posts } };
};

const Blog: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts }) => {
    return (
        <Container maxWidth={"md"}>
            <PageTitle backButton>Blog</PageTitle>
            <Stack spacing={3}>
                {posts.map(post => <PostCard key={post.slug} post={post} />)}
            </Stack>
        </Container>
    );
};

export default Blog;