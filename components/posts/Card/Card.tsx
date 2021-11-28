import React, { FC } from "react";
import Link from "next/link";
import { alpha, Box, Card as MuiCard, Typography } from "@mui/material";
import styled from "styled-components";

import { PostData } from "components/posts/posts.types";

export interface CardProps {
    post: PostData;
}

const StyledCard = styled(MuiCard)`
    cursor: pointer;
    padding: ${({ theme }) => theme.spacing(3)};
    border-radius: ${({ theme }) => theme.spacing(1)};

    &:hover {
        background-color: ${({ theme }) =>
        theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : alpha(theme.palette.grey[700], 0.2)};
    }
`;

export const Card: FC<CardProps> = ({ post }) => {
    const { slug, metadata: { date, title, description }}  = post;

    return (
        <Link href={`/blog/${slug}`} passHref>
            <StyledCard>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h3">{title}</Typography>
                    <Typography variant="subtitle2">{date}</Typography>
                </Box>
                <Typography variant="body1">{description}</Typography>
            </StyledCard>
        </Link>
    );
};