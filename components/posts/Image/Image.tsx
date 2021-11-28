import { Box, styled, Typography } from "@mui/material";
import React, { FC } from "react";
import { default as NextImage } from "next/image";

interface ImageProps {
    alt?: string;
    caption?: string;
    height: number;
    src: string;
}

const CenteredCaption = styled(Typography)(() => ({
    display: "inline-block",
    left: "50%",
    maxWidth: "300px",
    position: "relative",
    transform: "translate(-50%)"
}));

export const Image: FC<ImageProps> = ({ alt, caption, height, src }) => {
    return (
        <Box style={{ position: "relative" }} sx={{ my: 1 }}>
            <div style={{ position: "relative", height: `${height}px`, width: "100%"}}>
                <NextImage alt={alt} src={src} layout="fill" objectFit="contain" />
            </div>
            {caption && <CenteredCaption variant="caption">{caption}</CenteredCaption>}
        </Box>
    );
};