import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, styled, Typography } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { FC } from "react";

interface PageTitleProps {
    backButton?: boolean;
}

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: theme.spacing(3)
}));

export const PageTitle: FC<PageTitleProps> = ({ children }) => {
    const router = useRouter();

    return (
        <Box sx={{ position: "relative" }}>
            <StyledIconButton onClick={() => router.back()}>
                <ArrowBack />
            </StyledIconButton>
            <Typography variant="h1" sx={{ my: 2, textAlign: "center", px: 10 }}>{children}</Typography>
        </Box>);
};