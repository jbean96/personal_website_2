import { Box, Typography } from "@mui/material";
import React from "react";
import { default as NextImage } from "next/image";
import styled from "styled-components";

interface ImageProps {
    alt?: string;
    caption?: string;
    height: number;
    src: string;
}

const CenteredCaption = styled(Typography)`
    display: inline-block;
    left: 50%;
    maxWidth: 300px;
    position: relative;
    transform: translate(-50%);
`;

export const Image = ({ alt, caption, height, src }: ImageProps) => {
    return (
        <Box style={{ position: "relative" }} sx={{ mb: 2 }}>
            <div style={{ position: "relative", height: `${height}px`, width: "100%"}}>
                <NextImage alt={alt} src={src} layout="fill" objectFit="contain" />
            </div>
            {caption && <CenteredCaption variant="caption">{caption}</CenteredCaption>}
        </Box>
    );
};