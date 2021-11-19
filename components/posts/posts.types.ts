export type PostMetadata = {
    title: string;
    date: string;
    description: string;
}

export type PostData = { metadata: PostMetadata, slug: string };