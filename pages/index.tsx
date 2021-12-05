import path from "path";
import fs from "fs";

import Head from "next/head";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import React from "react";
import glob from "glob";
import matter from "gray-matter";
import { Stack } from "@mui/material";

import { PostData, validatePostMetadata } from "components/posts";
import { Card } from "components/posts/Card";
import { BlogHeader } from "components/BlogHeader";

// TODO: Make this getRenderedProps and fetch the lists of posts from elsewhere
export const getStaticProps: GetStaticProps<{ posts: PostData[] }> = async () => {
    const paths = glob.sync("posts/**/post.mdx");

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

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts }) => {
    return (
        <>
            <Head>
                <title>Josh Bean</title>
                <meta name="description" content="Josh Bean's blog" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BlogHeader />
            <Stack spacing={3}>
                {posts.map(post => <Card key={post.slug} post={post} />)}
            </Stack>
        </>
    );
};

export default Home;
