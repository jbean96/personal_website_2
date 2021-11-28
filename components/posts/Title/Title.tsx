import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { FC } from "react";
import styled from "styled-components";

interface TitleProps {
    backButton?: boolean;
}

const BackButtonWrapper = styled(IconButton)`
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: ${({ theme }) => theme.spacing(3)};

    ${({ theme }) => theme.breakpoints.down("md")} {
        position: unset;
        transform: unset;
    }
`;

const BlogTitle = styled(Typography)`
    margin: ${({ theme }) => theme.spacing(2, 0)};
    text-align: center;
    padding: ${({ theme }) => theme.spacing(0, 10)};

    ${({ theme }) => theme.breakpoints.down("md")} {
        padding: unset;
    }
`;

export const Title: FC<TitleProps> = ({ backButton, children }) => {
    const router = useRouter();

    return (
        <Box sx={{ position: "relative" }}>
            <BlogTitle
                variant="blogTitle"
                // @ts-ignore
                component="h1"
            >
                {children}
            </BlogTitle>
            {backButton && <BackButtonWrapper onClick={() => router.back()}>
                <ArrowBack />
            </BackButtonWrapper>}
        </Box>);
};