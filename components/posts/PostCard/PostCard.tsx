import React, { FC } from "react";
import Link from "next/link";
import { Box, Card, styled, Typography } from "@mui/material";

import { PostData } from "components/posts/posts.types";

export interface PostCardProps {
    post: PostData;
}

const StyledCard = styled(Card)(({ theme }) => ({
    transition: "background-color 200ms",
    ":hover": {
        backgroundColor: theme.palette.grey[100]
    }
}))

export const PostCard: FC<PostCardProps> = ({ post }) => {
    const { slug, metadata: { date, title, description }}  = post;

    return (
        <Link href={`/blog/${slug}`}>
            <StyledCard sx={{ cursor: "pointer", p: 2 }}>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h3">{title}</Typography>
                    <Typography variant="subtitle2">{date}</Typography>
                </Box>
                <Typography variant="body1">{description}</Typography>
            </StyledCard>
        </Link>
    )
}