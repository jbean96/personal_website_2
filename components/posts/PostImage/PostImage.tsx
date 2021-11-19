import { Box, styled, Typography } from "@mui/material";
import React, { FC } from "react"
import Image from "next/image";

interface PostImageProps {
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

const PostImage: FC<PostImageProps> = ({ alt, caption, height, src }) => {
    return (
        <Box style={{ position: "relative" }} sx={{ my: 1 }}>
            <div style={{ position: "relative", height: `${height}px`, width: "100%"}}>
                <Image alt={alt} src={src} layout="fill" objectFit="contain" />
            </div>
            {caption && <CenteredCaption variant="caption">{caption}</CenteredCaption>}
        </Box>
    )
}

export default PostImage;